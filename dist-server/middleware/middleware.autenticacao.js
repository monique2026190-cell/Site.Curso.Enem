import jwt from 'jsonwebtoken';
import { findUserById } from '../repository/repositorio.usuario.js';
import { logger } from '../logs/logger.js';
export const verificarAutenticacao = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido ou mal formatado.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await findUserById(decoded.userId);
        if (!user) {
            logger.warn({ userId: decoded.userId }, 'User not found for token.');
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        // Anexa os dados do usuário à requisição para uso posterior
        // @ts-ignore
        req.user = {
            id: user.id,
            email: user.email,
            nome: user.nome,
            foto_perfil: user.foto_perfil,
            perfilCompleto: user.perfil_completo
        };
        next();
    }
    catch (error) {
        logger.error({ error }, 'Token verification failed.');
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token expirado.' });
        }
        return res.status(401).json({ message: 'Token inválido.' });
    }
};
