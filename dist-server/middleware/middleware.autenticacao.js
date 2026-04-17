import jwt from 'jsonwebtoken';
import { appConfig } from '../config.js';
/**
 * Middleware para verificar a autenticidade de um token JWT.
 * O token deve ser fornecido no cabeçalho 'Authorization' como 'Bearer [token]'.
 */
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autorização não fornecido ou mal formatado.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, appConfig.JWT_SECRET);
        req.user = decoded; // Anexa os dados do usuário decodificados à requisição
        next(); // Continua para a próxima função de middleware ou para a rota
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token expirado.' });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Token inválido.' });
        }
        // Para outros erros inesperados
        return res.status(500).json({ message: 'Erro interno ao verificar o token.' });
    }
};
