import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import app from './server';

dotenv.config();

const port = process.env.PORT ?? 8000;

if (process.env.CONNECTION_STRING !== null && process.env.CONNECTION_STRING !== undefined) {
  MongoClient.connect(
    process.env.CONNECTION_STRING,
    {
      maxPoolSize: 50,
      waitQueueTimeoutMS: 2500,
    }
  ).then(async (client: MongoClient) => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}.`);
    });
  }).catch((err: Error) => {
    console.error(err.message);
    console.error(err.stack);
    process.exit(1);
  });
} else {
  console.error('Missing connection string in .env.');
}
