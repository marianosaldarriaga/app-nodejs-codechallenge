import {Injectable} from '@nestjs/common';
import {TransactionDto} from "./dto/response/transaction.dto/transaction.dto";
import {AddTransactionDto} from "./dto/request/add.transaction.dto/add.transaction.dto";
import {KafkaService} from "./services/kafka/kafka.service";
import {DataApiClient} from "./services/data.api.client/data.api.client";

@Injectable()
export class TransactionsService {

    constructor(
        private readonly dataApiClient: DataApiClient,
        private readonly kafkaService: KafkaService) { }

    async find(externalId: string): Promise<TransactionDto> {
        return this.dataApiClient.find(externalId);
    }
    async create(dtoRequest: AddTransactionDto): Promise<TransactionDto> {
        const transactionDto = await this.dataApiClient.create(dtoRequest);
        this.produce(transactionDto);
        return transactionDto;
    }

    produce(transactionDto: TransactionDto) {
        this.kafkaService.sendMessage('transactions', JSON.stringify(transactionDto));
    }
}
