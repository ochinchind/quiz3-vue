import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const headers = event.req.headers;
    const sqlSelect = usePostgres();
    const sqlSelectFollowed = usePostgres();

    try {
        const authHeader = headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return { success: false, message: 'Authorization header missing or invalid' };
        }

        const token = authHeader.split(' ')[1];

        const userResult = await sqlSelect`SELECT * FROM users WHERE token = ${token}`;
    
        event.waitUntil(sqlSelect.end())
        if (userResult.length == 0) {
            return { success: false, message: 'User does not exist' };
        }

        const userId = userResult[0].id;

        const followedUsers = await sqlSelectFollowed`
            SELECT 
                u.id,
                u.username, 
                u.avatar
            FROM 
                users_followings uf
            LEFT JOIN 
                users u 
            ON 
                uf.user_id_following = u.id
            WHERE 
                uf.user_id = ${userId}
        `;

        event.waitUntil(sqlSelectFollowed.end());

        return { 
            success: true, 
            message: `User's last activity updated and followed users fetched`, 
            followedUsers: followedUsers 
        };
    } catch (error) {
        console.log('Error connecting to PostgreSQL:', error);
        return { success: false, message: 'Database error' };
    } finally {
        await sqlSelectFollowed.end();
    }
});