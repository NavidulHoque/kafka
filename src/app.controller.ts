import { Controller, Get, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// kafka consumer
@Controller()
export class AppController {

  

  @MessagePattern('hello-topic')
  handleKafkaMessage(@Payload() message: any) {
    console.log('Received:', message.value);
    return `Received your message: ${message.value}`;
  }

  
}
