import {TransactionDto} from "../../dto/response/transaction.dto/transaction.dto";
import {Args, Query, Resolver} from "@nestjs/graphql";
import {TransactionsService} from "../../transactions.service";

@Resolver(() => TransactionDto)
export class TransactionsResolver {

    constructor(private readonly transactionsService: TransactionsService) { }

    @Query(() => TransactionDto)
    async findTransaction(@Args('id') id: string): Promise<TransactionDto> {
        return this.transactionsService.find(id);
    }
}
