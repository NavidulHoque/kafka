// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Start HTTP Server
  await app.listen(5000)

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'nestjs-kafka-client',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'nestjs-consumer-group',
      },
    },
  });

  // Start Kafka consumer
  await app.startAllMicroservices()
    .then(() => console.log('Kafka Microservice connected'))
    .catch(err => {
      console.error('Kafka connection failed', err);
    });
}
bootstrap();
