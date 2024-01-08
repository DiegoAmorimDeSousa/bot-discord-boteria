import { Router } from 'express';

import discordRouter from './Discord/discord.routes';

const routes = Router();

routes.use('/discord', discordRouter);

export default routes;
