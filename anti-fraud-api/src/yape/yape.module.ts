import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsService } from './transactions/transactions.service';
import { ConfigModule } from '@nestjs/config';
import {DataService} from "./transactions/services/data.service/data.service";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports:[
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../variables.env'],
    }),

    // Axios
    HttpModule.register({
      timeout: 5000
    })
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, DataService]
})
export class YapeModule {}
