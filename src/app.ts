import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';
import RabbitMQService from './services/rabbitmq.service';

async function startConsumer() {
  await RabbitMQService.connect();
  await RabbitMQService.consumeMessages();
}

startConsumer();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use('/api', userRoutes);

mongoose.connect('mongodb://localhost:27017/ts_mongo_crud', {
 // useNewUrlParser: true, // This property is no longer necessary
  // useUnifiedTopology: true
}).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => {
  console.log('Failed to connect to MongoDB', err);
});
