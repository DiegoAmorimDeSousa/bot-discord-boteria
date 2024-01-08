import { Router } from 'express';

import DiscordController from '../../controllers/Discord/Discord';

const listRouter = Router();

listRouter.get('/', DiscordController.bot);

export default listRouter;
