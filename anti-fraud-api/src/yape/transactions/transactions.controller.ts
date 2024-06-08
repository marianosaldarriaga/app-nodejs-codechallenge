import { Controller } from '@nestjs/common';
import {EventPattern, Payload, Transport} from "@nestjs/microservices";
import {TransactionsService} from "./transactions.service";
import {TransactionDto} from "./dto/transaction.dto/transaction.dto";

@Controller()
export class TransactionsController {

    constructor(private readonly transactionsService: TransactionsService) { }

    @EventPattern('transactions', Transport.KAFKA)
    handleEvent(@Payload() payload: TransactionDto) {
        return this.transactionsService.validate(payload);
    }

}
