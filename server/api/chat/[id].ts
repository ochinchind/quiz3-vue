import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const headers = event.req.headers;
    const sqlSelect = usePostgres();
    const sqlSelectUser = usePostgres();
    const sqlSelectFollowed = usePostgres();
    const { id } = event.context.params;

    try {
        const authHeader = headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return { success: false, message: 'Authorization header missing or invalid' };
        }
  
        const token = authHeader.split(' ')[1];
  
        const userResult = await sqlSelectUser`SELECT * FROM users WHERE token = ${token}`;
    
        event.waitUntil(sqlSelectUser.end());
  
        if (userResult.length == 0) {
            return { success: false, message: 'User does not exist' };
        }
  
        const authenticatedUserId = userResult[0].id;

        const messages = await sqlSelectFollowed`
            SELECT 
                chat.user_id_to,
                chat.message,
                u_to.avatar AS avatar_to,
                u_to.last_activity AS last_activity_to,
                COALESCE(following_from.name, u_from.username) AS username_from,
                chat.user_id_from,
                u_from.avatar AS avatar_from,
                u_from.last_activity AS last_activity_from,
                u_to.username AS username_to
            FROM 
                chat_messages chat
            LEFT JOIN 
                users u_to
            ON 
                chat.user_id_to = u_to.id
            LEFT JOIN 
                users_followings following_from
            ON
                following_from.user_id_following = chat.user_id_from AND following_from.user_id = chat.user_id_to
            LEFT JOIN 
                users u_from
            ON
                chat.user_id_from = u_from.id
            WHERE
                (chat.user_id_to = ${authenticatedUserId} AND chat.user_id_from = ${id}) 
                OR 
                (chat.user_id_to = ${id} AND chat.user_id_from = ${authenticatedUserId})
            ORDER BY
                chat.created_at ASC
        `;

        event.waitUntil(sqlSelectFollowed.end());

        return { 
            success: true,
            messages: messages 
        };
    } catch (error) {
        console.log('Error connecting to PostgreSQL:', error);
        return { success: false, message: 'Database error' };
    } finally {
        await sqlSelectFollowed.end();
    }
});