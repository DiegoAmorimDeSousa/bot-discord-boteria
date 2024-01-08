import { Router } from 'express';

import DefaultController from '../../controllers/Default/Default';

const listRouter = Router();

listRouter.get('/', DefaultController.setup);

export default listRouter;
