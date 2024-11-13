import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const headers = event.req.headers;
    const sqlSelect = usePostgres();
    const sqlSelectFollowed = usePostgres();
    const { id } = event.context.params;

    try {

        const followedUsers = await sqlSelectFollowed`
            SELECT 
                u.id,
                uf.name as username, 
                u.avatar,
                u.last_activity
            FROM 
                users_followings uf
            LEFT JOIN 
                users u 
            ON 
                uf.user_id_following = u.id
            WHERE 
                uf.user_id = ${id}
        `;

        event.waitUntil(sqlSelectFollowed.end());

        return { 
            success: true,
            followedUsers: followedUsers 
        };
    } catch (error) {
        console.log('Error connecting to PostgreSQL:', error);
        return { success: false, message: 'Database error' };
    } finally {
        await sqlSelectFollowed.end();
    }
});