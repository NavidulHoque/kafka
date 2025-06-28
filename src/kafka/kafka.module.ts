import { Module } from '@nestjs/common';
import { KafkaController } from './kafka.controller';
import { KafkaProducerService } from './kafka.service';

@Module({
  controllers: [KafkaController],
  providers: [KafkaProducerService],
})
export class KafkaModule {}
