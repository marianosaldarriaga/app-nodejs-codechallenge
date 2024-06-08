import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsService } from './transactions/transactions.service';
import {ConfigModule} from "@nestjs/config";
import {HttpModule} from "@nestjs/axios";
import {KafkaService} from "./transactions/services/kafka/kafka.service";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {GraphQLModule} from "@nestjs/graphql";
import {TransactionsResolver} from "./transactions/resolvers/transactions.resolver/transactions.resolver";
import {DataApiClient} from "./transactions/services/data.api.client/data.api.client";

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../variables.env'],
    }),

    // Axios
    HttpModule.register({
      timeout: 5000
    }),

    // GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true
    })
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, DataApiClient, KafkaService, TransactionsResolver]
})
export class YapeModule {}
