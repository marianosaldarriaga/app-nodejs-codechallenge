import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {AddTransactionDto} from "./dto/request/add.transaction.dto/add.transaction.dto";
import {TransactionDto} from "./dto/response/transaction.dto/transaction.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {TypeEntity} from "./entities/type.entity/type.entity";
import {Repository} from "typeorm";
import {StatusEntity} from "./entities/status.entity/status.entity";
import {TransactionEntity} from "./entities/transaction.entity/transaction.entity";
import {AccountEntity} from "./entities/account.entity/account.entity";
import {v4 as uuidv4} from 'uuid';
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from 'cache-manager';
import {Constants} from "../../helpers/constants/constants";
import {TypeDto} from "./dto/response/type.dto/type.dto";
import {StatusDto} from "./dto/response/status.dto/status.dto";
import {UpdateTransactionDto} from "./dto/request/update.transaction.dto/update.transaction.dto";

@Injectable()
export class TransactionsService {

    constructor(
        @InjectRepository(TypeEntity) private typeRepository: Repository<TypeEntity>
        , @InjectRepository(StatusEntity) private statusRepository: Repository<StatusEntity>
        , @InjectRepository(TransactionEntity) private transactionRepository: Repository<TransactionEntity>
        , @InjectRepository(AccountEntity) private accountRepository: Repository<AccountEntity>

        , @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    async find(externalId: string): Promise<TransactionDto> {
        try {
            var transactionEntity = await this.cacheManager.get<TransactionEntity>(externalId);

            if (transactionEntity == null) {

                // If not exists in cache, search in database and save in cache (depends on the cache strategies, for this challenge we are using a simple cache strategy)
                // transactionEntity = await this.transactionRepository.findOne({where: {externalId: externalId}, relations: ['type', 'status']});

                if(transactionEntity == null) {
                    throw new Error('Transaction not exists.');
                } else {
                    await this.cacheManager.set(transactionEntity.externalId, transactionEntity, Constants.CACHE_TTL);
                }
            }

            var dtoResponse = new TransactionDto();
            dtoResponse.transactionExternalId = transactionEntity.externalId;
            dtoResponse.value = transactionEntity.value;
            dtoResponse.createdAt = new Date(transactionEntity.createdAt).toISOString();

            dtoResponse.transactionType = new TypeDto();
            dtoResponse.transactionType.name = transactionEntity.type.name;

            dtoResponse.transactionStatus = new StatusDto();
            dtoResponse.transactionStatus.name = transactionEntity.status.name;

            return dtoResponse;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async create(dtoRequest: AddTransactionDto): Promise<TransactionDto> {

        try{
            // Validations
            const transferType = await this.typeRepository.findOne({where: {id: dtoRequest.transferTypeId}});
            if(transferType == null) { throw new Error('Transfer type not exists.'); }

            const accountDebit = await this.accountRepository.findOne({where: {externalId: dtoRequest.accountExternalIdDebit}});
            if(accountDebit == null) { throw new Error('Account debit not exists.'); }

            const accountCredit = await this.accountRepository.findOne({where: {externalId: dtoRequest.accountExternalIdCredit}});
            if(accountCredit == null) { throw new Error('Account credit not exists.'); }

            if(accountDebit.balance < dtoRequest.value) { throw new Error('Account debit balance is not enough.'); }

            // Create transaction
            const statusEntity = await this.statusRepository.findOne({where: {name: Constants.STATUS_PENDING}});

            const transactionEntity = new TransactionEntity();
            transactionEntity.type = transferType;
            transactionEntity.status = statusEntity;
            transactionEntity.accountDebitId = accountDebit.id;
            transactionEntity.accountCreditId = accountCredit.id;
            transactionEntity.value = dtoRequest.value;
            transactionEntity.externalId = uuidv4();
            transactionEntity.createdAt = new Date();

            // Save transaction in database
            await this.transactionRepository.save(transactionEntity);

            // Save transaction in cache
            await this.cacheManager.set(transactionEntity.externalId, transactionEntity);

            return await this.find(transactionEntity.externalId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: string, dtoRequest: UpdateTransactionDto): Promise<TransactionDto> {
        try {
            if(dtoRequest.status == Constants.STATUS_PENDING) { throw new Error('State not allowed.'); }

            var transactionEntity = await this.transactionRepository.findOne({where: {externalId: id}, relations: ['type', 'status']});
            if(transactionEntity == null) { throw new Error('Transaction not exists.'); }

            const statusEntity = await this.statusRepository.findOne({where: {name: dtoRequest.status}});
            if(statusEntity == null) { throw new Error('Status not exists.'); }

            transactionEntity.status = statusEntity;

            await this.transactionRepository.save(transactionEntity);

            await this.cacheManager.set(transactionEntity.externalId, transactionEntity);

            return await this.find(transactionEntity.externalId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
