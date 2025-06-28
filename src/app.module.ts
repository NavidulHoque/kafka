import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  controllers: [AppController],
  imports: [KafkaModule],
})
export class AppModule {}
