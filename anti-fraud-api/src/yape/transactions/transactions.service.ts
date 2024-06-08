import { Injectable } from '@nestjs/common';
import {TransactionDto} from "./dto/transaction.dto/transaction.dto";
import {Constants} from "../../helpers/constants/constants";
import {DataService} from "./services/data.service/data.service";
import {UpdateDto} from "./dto/update.dto/update.dto";

@Injectable()
export class TransactionsService {

    constructor(private readonly dataService: DataService) { }

    async validate(transaction: TransactionDto) {
        var status: string;

        if(transaction.value > 1000) {
            status = Constants.STATUS_REJECTED;
        } else {
            status = Constants.STATUS_APPROVED;
        }

        const updateDto = new UpdateDto();
        updateDto.status = status;
        await this.dataService.update(transaction.transactionExternalId, updateDto);
    }
}
