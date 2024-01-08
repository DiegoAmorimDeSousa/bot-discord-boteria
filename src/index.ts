const env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `./config/${env}.env` });

import express from 'express';
import cors from 'cors';
import routes from './app/routers';
import connectoMongoDB from './app/database';
import logger from './app/utils/logger';

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

connectoMongoDB();

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export default app;
