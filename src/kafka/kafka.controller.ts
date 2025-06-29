import { Body, Controller, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaProducerService } from './kafka.service';

//kafka consumer
@Controller("messages")
export class KafkaController {

    constructor(private readonly kafkaProducerService: KafkaProducerService) { }

    @MessagePattern('hello-topic')
    async handleHelloTopic(@Payload() message: string) {
        console.log('Consumed: hello-topic', message);
        await new Promise(resolve => setTimeout(resolve, 150));  // suppose db delay average 150ms
    }

    @MessagePattern('hello-second-topic')
    async handleHelloSecondTopic(@Payload() message: string) {
        console.log('Consumed: hello-second-topic', message);
        await new Promise(resolve => setTimeout(resolve, 150));  // suppose db delay average 150ms
    }

    @Post('send')
    async sendKafkaMessage(@Body('message') message: string) {
        await this.kafkaProducerService.sendMessage('hello-topic', message);
        return `Sent message: ${message}`;
    }

    @Post('send/second-message')
    async sendKafkaSecondMessage(@Body('message') message: string) {
        await this.kafkaProducerService.sendMessage('hello-second-topic', message);
        return `Sent message: ${message}`;
    }
}
