import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const sqlSelect = usePostgres();
    const sqlInsert = usePostgres();

    try {
        const userResult = await sqlSelect`SELECT * FROM users WHERE email = ${body.email}`;

        event.waitUntil(sqlSelect.end())
        if (userResult.length == 0) {
            return { success: false, message: 'User does not exist' };
        }

        const forget_password_code = userResult[0].forget_password_code;

        if (forget_password_code == null) {
            return { success: false, message: 'you didnt send code!' };
        }

        if (forget_password_code != body.secretPhrase) {
            return { success: false, message: 'invalid code!' };
        }

        const hashedPassword = await bcrypt.hash(body.newPassword, 10);

        await sqlInsert`
            UPDATE users SET password = ${hashedPassword} WHERE id = ${userResult[0].id}
        `;

        event.waitUntil(sqlInsert.end())

        return { success: true, message: `Password changed` };
    } catch (error) {
        console.log('Error connecting to PostgreSQL:', error);
        return { success: false, message: 'Database error' };
    } finally {
        await sqlInsert.end();
    }
});