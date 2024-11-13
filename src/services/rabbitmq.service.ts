// src/services/rabbitmq.service.ts
import amqplib, { Connection, Channel } from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

class RabbitMQService {
  private connection!: Connection;
  private channel!: Channel;
  private queueName = process.env.QUEUE_NAME as string;

  public async connect(): Promise<void> {
    try {
      this.connection = await amqplib.connect(process.env.RABBITMQ_URL as string);
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(this.queueName, { durable: true });
      console.log('Consumer connected to RabbitMQ and waiting for messages...');
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
      throw error;
    }
  }

  // Method to start consuming messages
  public async consumeMessages(): Promise<void> {
    await this.channel.consume(this.queueName, (msg) => {
      if (msg) {
        const messageContent = msg.content.toString();
        console.log('Received message:', messageContent);

        // Process the message
        this.processMessage(JSON.parse(messageContent));

        // Acknowledge the message to RabbitMQ
        this.channel.ack(msg);
      }
    });
  }

  // Custom method to process each received message
  private processMessage(message: { action: string, data: any }) {
    // Here, handle the message based on its 'action'
    if (message.action === 'create_note') {
      console.log('Processing note creation:', message.data);
      // Further processing logic...
    } else {
      console.log('Unknown action:', message.action);
    }
  }
}

export default new RabbitMQService();
