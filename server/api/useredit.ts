import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const headers = event.req.headers;
    const sqlSelect = usePostgres();
    const sqlInsert = usePostgres();

    try {
        const authHeader = headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return { success: false, message: 'Authorization header missing or invalid' };
        }

        const token = authHeader.split(' ')[1];

        const secretKey = process.env.JWT_SECRET;
        let decodedToken;
        try {
          decodedToken = jwt.verify(token, secretKey);
        } catch (err) {
          return { success: false, message: 'Invalid token' };
        }

        const tokenUserId = decodedToken.userId;

        const userResult = await sqlSelect`SELECT * FROM users WHERE id = ${tokenUserId}`;
    
        event.waitUntil(sqlSelect.end())
        if (userResult.length == 0) {
            return { success: false, message: 'User does not exist' };
        }

        const { age, location } = body;
        await sqlInsert`
          UPDATE users 
          SET age = ${age}, location = ${location} 
          WHERE id = ${tokenUserId}
        `;
    
        event.waitUntil(sqlInsert.end());

        return { success: true, message: `User is changed` };
    } catch (error) {
        console.log('Error connecting to PostgreSQL:', error);
        return { success: false, message: 'Database error' };
    } finally {
        await sqlInsert.end();
    }
});