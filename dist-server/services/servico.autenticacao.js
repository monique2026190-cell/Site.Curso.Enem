import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { appConfig } from '../config.js';
const client = new OAuth2Client(appConfig.GOOGLE_CLIENT_ID);
/**
 * Verifica o token de ID do Google e extrai as informações do usuário.
 * @param {string} token - O token de ID do Google enviado pelo cliente.
 * @returns {Promise<object | null>} Um objeto com os dados do usuário ou null se o token for inválido.
 */
export async function verifyGoogleToken(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: appConfig.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (payload) {
            return {
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
                provider: 'google',
                providerId: payload.sub,
            };
        }
        return null;
    }
    catch (error) {
        console.error('Erro ao verificar o token do Google:', error);
        return null;
    }
}
/**
 * Gera um token JWT para um usuário autenticado.
 * @param {object} user - O objeto do usuário para o qual o token será gerado.
 * @returns {string} O token JWT assinado.
 */
export function generateJwt(user) {
    return jwt.sign(user, appConfig.JWT_SECRET, { expiresIn: '1h' });
}
