import mongoose from 'mongoose';
import logger from '../utils/logger';

export default function connectoMongoDB(): void {
  mongoose.connect(
    process.env.MONGO_URL || '',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    () => logger.debug('Connected to MongoDB')
  );
}
