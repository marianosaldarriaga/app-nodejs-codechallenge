import {Body, Controller, Get, Param, Post, Put, UseInterceptors} from '@nestjs/common';
import {TransactionsService} from "./transactions.service";
import {AddTransactionDto} from "./dto/request/add.transaction.dto/add.transaction.dto";
import {UpdateTransactionDto} from "./dto/request/update.transaction.dto/update.transaction.dto";

@Controller('v1/transactions')
export class TransactionsController {

    constructor(private transactionsService: TransactionsService) {
    }

    @Get(':id')
    get(@Param('id') id: string) {
        return this.transactionsService.find(id);
    }

    @Post()
    create(@Body() dtoRequest: AddTransactionDto) {
        return this.transactionsService.create(dtoRequest);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dtoRequest: UpdateTransactionDto) {
        return this.transactionsService.update(id, dtoRequest);
    }
}
