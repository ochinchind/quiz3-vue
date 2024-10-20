
import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const sqlSelect = usePostgres();
    const sqlInsert = usePostgres();

    try {
        const userResult = await sqlSelect`SELECT * FROM users WHERE username = ${body.username}`;

        event.waitUntil(sqlSelect.end())
        if (userResult.length == 0) {
            return { success: false, message: 'User does not exist' };
        }

        var transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let code = Math.floor(100000 + Math.random() * 900000).toString();

        const mailOptions = {
            from: '"Example" <example@example.com>',
            to: userResult[0].email,
            subject: 'Welcome!',
            text: 'Hello, this is your code! Code: ' + code,
            html: '<b>Hello, this is your code! Code: ' + code + ' </b>',
        };

        await sqlInsert`
            UPDATE users SET redeem_code = ${code} WHERE id = ${userResult[0].id}
        `;

        const info = await transport.sendMail(mailOptions);
        return { success: true, message: `Email sent: ${info.messageId}` };
    } catch (error) {
        console.log('Error connecting to PostgreSQL:', error);
        return { success: false, message: 'Database error' };
    } finally {
        await sqlInsert.end();
    }
});