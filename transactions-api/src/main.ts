import { NestFactory } from '@nestjs/core';
import {YapeModule} from "./yape/yape.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(YapeModule);

  const config = new DocumentBuilder()
      .setTitle('Yape challenge API')
      .setDescription('This is the API for the Yape challenge.')
      .setVersion('1.0')
      .setContact('Mariano Saldarriaga', 'https://www.linkedin.com/in/mariano-saldarriaga-sanoni/', 'marianosaldarriaga@icloud.com')
      .addBasicAuth()
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
