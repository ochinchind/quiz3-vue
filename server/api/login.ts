
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const sql = usePostgres();

    try {
        const userQuery = 'SELECT * FROM users WHERE username = $1';
        const userResult = await sql`${userQuery}`; 

        event.waitUntil(sql.end())

        if (userResult.length === 0) {
            return { success: false, message: 'User not found' };
        }

        const user = userResult[0];

        const isMatch = await bcrypt.compare(body.password, user.password);
        if (!isMatch) {
            return { success: false, message: 'Invalid password' };
        }

        return {
            success: true,
            message: 'Login successful',
            userId: user.id,
            activated: user.activated,
        };
    } catch (error) {
        console.log('Error connecting to PostgreSQL:', error);
        return { success: false, message: 'Database error' };
    } finally {
        await sql.end();
    }
});