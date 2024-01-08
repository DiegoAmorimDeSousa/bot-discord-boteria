import { Router } from 'express';

import defaultRouter from './Default/default.routes';

const routes = Router();

routes.use('/default', defaultRouter);

export default routes;
