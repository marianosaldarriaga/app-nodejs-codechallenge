import { NestFactory } from '@nestjs/core';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {YapeModule} from "./yape/yape.module";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(YapeModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [`${configService.get<string>('KAFKA_HOST')}:${configService.get<string>('KAFKA_PORT')}`],
      }
    }
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
