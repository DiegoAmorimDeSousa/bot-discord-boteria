import { Request, Response } from 'express';
import logger from '../../utils/logger';
import { sumCode } from '../../services/Default/default.service';
import buildMessageError from '../../utils/buildMessageError';

class DefaultController {
  async setup(request: Request, response: Response) {
    try {
      const { code } = request.body;

      const sum = await sumCode(code);

      return response.json({ sum: sum });
    } catch (error: any) {
      logger.error(
        buildMessageError({
          controller: 'DefaultController.create',
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

export default new DefaultController();
