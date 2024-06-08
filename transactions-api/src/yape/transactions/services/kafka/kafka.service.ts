import { Injectable } from '@nestjs/common';
import {Kafka} from "kafkajs";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class KafkaService {
    private kafka: Kafka;

    constructor(private configService: ConfigService) {
        this.kafka = new Kafka({
            clientId: configService.get<string>('KAFKA_CLIENT_ID'),
            brokers: [`${configService.get<string>('KAFKA_HOST')}:${configService.get<string>('KAFKA_PORT')}`],
        });
    }

    async sendMessage(topic: string, message: string): Promise<void> {
        const producer = this.kafka.producer();
        await producer.connect();
        await producer.send({
            topic,
            messages: [
                { value: message }
            ]
        });
        await producer.disconnect();
    }
}
