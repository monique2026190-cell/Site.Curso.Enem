import pool from '../db/pool.js';
import { logger } from '../logs/logger.js';
import { findUserByGoogleIdQuery, createUserQuery, updateUserProfileQuery, findUserByIdQuery } from '../db/queries/usuario.queries.js';
export const findUserById = async (userId) => {
    const client = await pool.connect();
    try {
        const result = await client.query(findUserByIdQuery, [userId]);
        if (result.rows.length > 0) {
            return result.rows[0];
        }
        return null;
    }
    catch (error) {
        logger.error({ error, userId }, 'Error in findUserById');
        throw error;
    }
    finally {
        client.release();
    }
};
export const findOrCreateUser = async (googleUser) => {
    const client = await pool.connect();
    try {
        const findUserResult = await client.query(findUserByGoogleIdQuery, [googleUser.sub]);
        if (findUserResult.rows.length > 0) {
            const existingUser = findUserResult.rows[0];
            logger.info({ userId: existingUser.id, email: existingUser.email }, 'User found in database.');
            return existingUser;
        }
        logger.info({ email: googleUser.email }, 'User not found. Creating new user.');
        const createUserValues = [
            googleUser.sub,
            googleUser.name,
            googleUser.email,
            googleUser.picture,
        ];
        const createUserResult = await client.query(createUserQuery, createUserValues);
        const newUser = createUserResult.rows[0];
        logger.info({ userId: newUser.id, email: newUser.email }, 'New user created successfully.');
        return newUser;
    }
    catch (error) {
        logger.error({ error }, 'Error in findOrCreateUser');
        throw error;
    }
    finally {
        client.release();
    }
};
export const updateUserProfile = async (userId, nome) => {
    const client = await pool.connect();
    try {
        const values = [nome, userId];
        const result = await client.query(updateUserProfileQuery, values);
        logger.info({ userId, nome }, 'User profile updated successfully.');
        return result.rows[0];
    }
    catch (error) {
        logger.error({ error, userId, nome }, 'Error updating user profile');
        throw error;
    }
    finally {
        client.release();
    }
};
