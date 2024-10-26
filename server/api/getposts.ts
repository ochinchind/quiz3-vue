import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try {
        const sql = usePostgres();

        var result = [];

        if (body.user_id) {
            result = await sql`SELECT
                posts.id,
                posts.post_text,
                posts.rating,
                posts.user_id,
                posts.created_at,
                users.username,
                users.avatar
            FROM
                posts
            INNER JOIN
                users
            ON
                posts.user_id = users.id
            WHERE
                posts.user_id = ${body.user_id}`;
        } else {
            result = await sql`SELECT
                posts.post_text,
                posts.rating,
                posts.user_id,
                posts.created_at,
                users.username,
                users.avatar
            FROM
                posts
            INNER JOIN
                users
            ON
                posts.user_id = users.id`;
        }

        event.waitUntil(sql.end());

        if (result.length === 0) {
            return { success: false, message: 'User not found' };
        }

        return { success: true, posts: result };
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { success: false, message: 'Database error' };
    }
});