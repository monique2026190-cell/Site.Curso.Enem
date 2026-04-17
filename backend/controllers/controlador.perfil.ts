
import { Request, Response } from 'express';
import { updateUserProfile } from '../repository/repositorio.usuario.js';

export const updateProfileHandler = async (req: any, res: Response) => {
  const userId = req.user.id;
  const { nomeUsuario } = req.body;

  try {
    const updatedUser = await updateUserProfile(userId, nomeUsuario);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o perfil.' });
  }
};
