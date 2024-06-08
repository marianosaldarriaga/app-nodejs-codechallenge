import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {TransactionsService} from "./transactions.service";
import {AddTransactionDto} from "./dto/request/add.transaction.dto/add.transaction.dto";
import {ApiBasicAuth, ApiProduces, ApiResponse, ApiResponseProperty, ApiTags} from "@nestjs/swagger";
import {ApiAuthGuard} from "./guards/api.auth.guard/api.auth.guard";
import {TransactionDto} from "./dto/response/transaction.dto/transaction.dto";

@ApiBasicAuth()
@ApiTags('Transactions')
@UseGuards(ApiAuthGuard)
@Controller('v1/transactions')
export class TransactionsController {

    constructor(private transactionsService: TransactionsService) { }

    @Get(':id')
    @ApiProduces('application/json')
    @ApiResponse({ status: 200, type: TransactionDto })
    get(@Param('id') id: string) {
        return this.transactionsService.find(id);
    }

    @Post()
    @ApiProduces('application/json')
    @ApiResponse({ status: 201, type: TransactionDto })
    create(@Body() dtoRequest: AddTransactionDto) {
        return this.transactionsService.create(dtoRequest);
    }
}
