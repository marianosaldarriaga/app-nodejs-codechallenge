import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsService } from './transactions/transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {TypeEntity} from "./transactions/entities/type.entity/type.entity";
import {StatusEntity} from "./transactions/entities/status.entity/status.entity";
import {TransactionEntity} from "./transactions/entities/transaction.entity/transaction.entity";
import {AccountEntity} from "./transactions/entities/account.entity/account.entity";
import { CacheModule } from '@nestjs/cache-manager';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import {Constants} from "../helpers/constants/constants";

@Module({
    imports: [
        // Config
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['../variables.env'],
        }),

        // ORM
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => {
                return {
                    type: 'postgres',
                    host: config.get<string>('POSTGRES_HOST'),
                    port: config.get<number>('POSTGRES_PORT'),
                    username: config.get<string>('POSTGRES_USER'),
                    password: config.get<string>('POSTGRES_PASSWORD'),
                    database: config.get<string>('POSTGRES_DB'),
                    schema: 'public',
                    synchronize: false,
                    autoLoadEntities: true,
                    logging: config.get<boolean>('DB_LOGGING'),
                };

            },
            inject: [ConfigService]
        })
        , TypeOrmModule.forFeature([TypeEntity])
        , TypeOrmModule.forFeature([StatusEntity])
        , TypeOrmModule.forFeature([TransactionEntity])
        , TypeOrmModule.forFeature([AccountEntity])

        // Cache
        , CacheModule.registerAsync({
            isGlobal: true,
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                ttl: Constants.CACHE_TTL,
                store: await redisStore({
                    socket: {
                        host: configService.get<string>('REDIS_HOST'),
                        port: configService.get<number>('REDIS_PORT'),
                    }
                })
            }),
            inject: [ConfigService],
        })
    ],
    providers: [
        TransactionsService
    ],
    controllers: [TransactionsController]
})
export class YapeModule {}
