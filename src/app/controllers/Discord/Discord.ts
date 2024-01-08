import { Request, Response } from 'express';
import logger from '../../utils/logger';
import buildMessageError from '../../utils/buildMessageError';

import { Client, Events, GatewayIntentBits } from 'discord.js';

class DiscordController {
  async bot(request: Request, response: Response) {
    try {
      const client = new Client({ intents: [GatewayIntentBits.Guilds] });

      client.once(Events.ClientReady, c => {
        console.log(`Login realido como: ${c.user.tag}`);
      });

      client.login(process.env.TOKEN_BOT_DISCORD);

    } catch (error: any) {
      logger.error(
        buildMessageError({
          controller: 'DiscordController.create',
          body: JSON.stringify(request.body),
          method: JSON.stringify(request.method),
        })
      );
      return response
        .status(error.message.split('-')[0])
        .json({ error: error.message.split('-')[1].trim() });
    }
  }
}

export default new DiscordController();
