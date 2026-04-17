import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { findOrCreateUser } from '../repository/repositorio.usuario.js';
import { logger } from '../logs/logger.js';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const googleLoginHandler = async (req, res) => {
    const { credential } = req.body;
    if (!credential) {
        logger.warn('Credential token not provided.');
        return res.status(400).json({ message: 'Credential token not provided.' });
    }
    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload || !payload.sub || !payload.email) {
            logger.warn('Invalid Google token payload.');
            return res.status(401).json({ message: 'Invalid Google token.' });
        }
        const user = await findOrCreateUser(payload);
        const appJwt = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        logger.info({ userId: user.id }, 'User authenticated successfully.');
        res.status(200).json({
            token: appJwt,
            perfilCompleto: user.perfil_completo,
            user: {
                id: user.id,
                email: user.email,
                nome: user.nome,
                foto_perfil: user.foto_perfil,
            }
        });
    }
    catch (error) {
        logger.error({ error }, 'Error during Google login');
        res.status(500).json({ message: 'Internal server error during Google login.' });
    }
};
export const meHandler = (req, res) => {
    // O middleware verificarAutenticacao já validou o token e anexou os dados do usuário a req.user
    // @ts-ignore
    if (req.user) {
        // @ts-ignore
        logger.info({ userId: req.user.id }, 'User data requested via /me endpoint.');
        // @ts-ignore
        res.status(200).json(req.user);
    }
    else {
        logger.warn('Attempted to access /me without a valid user session.');
        res.status(404).json({ message: 'User not found.' });
    }
};
