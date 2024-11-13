import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    const body = await readBody(event); // Retrieve request body
    const headers = event.req.headers; // Retrieve request headers
    const sqlSelectUser = usePostgres(); // Connection for user selection
    const sqlInsertMessage = usePostgres(); // Connection for inserting message
    const { id } = event.context.params; // Retrieve user ID from params

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

        if (!body.message || !body.userId) {
            return { success: false, message: 'Message content and recipient ID are required' };
        }

        const { userId, message } = body;

        await sqlInsertMessage`
            INSERT INTO chat_messages (user_id_from, user_id_to, message) 
            VALUES (${authenticatedUserId}, ${userId}, ${message})
        `;
        event.waitUntil(sqlInsertMessage.end());

        return { 
            success: true,
            message: 'Message sent successfully'
        };
    } catch (error) {
        console.log('Error connecting to PostgreSQL:', error);
        return { success: false, message: 'Database error' };
    } finally {
        await sqlInsertMessage.end();
    }
});
