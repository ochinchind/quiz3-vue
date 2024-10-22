import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const headers = event.req.headers;
    const sqlSelectUser = usePostgres();
    const sqlSelect = usePostgres();

    try {
        const authHeader = headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return { success: false, message: 'Authorization header missing or invalid' };
        }

        const token = authHeader.split(' ')[1];
        const userResult = await sqlSelectUser`SELECT * FROM users WHERE token = ${token}`;
        event.waitUntil(sqlSelectUser.end());

        if (userResult.length === 0) {
            return { success: false, message: 'User does not exist' };
        }

        const authenticatedUserId = userResult[0].id;
        const { user_id } = body;

        const followingResult = await sqlSelect`
            SELECT * FROM users_followings 
            WHERE user_id = ${authenticatedUserId} 
            AND user_id_following = ${user_id}
        `;
        event.waitUntil(sqlSelect.end());

        if (followingResult.length > 0) {
            return { success: true, isFollowing: true };
        } else {
            return { success: true, isFollowing: false };
        }

    } catch (error) {
        console.error('Error checking follow status:', error);
        return { success: false, message: 'Database error' };
    }
});