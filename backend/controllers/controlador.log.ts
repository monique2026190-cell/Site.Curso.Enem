import { Request, Response } from 'express';

export const logMessage = (req: Request, res: Response) => {
  const logPayload = req.body;

  // O console.log no backend agora receberá o objeto de log completo
  console.log('Log do Frontend:', logPayload);

  res.status(200).send('Log recebido');
};