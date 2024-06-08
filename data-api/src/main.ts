import { NestFactory } from '@nestjs/core';
import {YapeModule} from "./yape/yape.module";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(YapeModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
