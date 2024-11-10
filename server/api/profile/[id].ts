import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    const headers = event.req.headers;
    const sqlSelect = usePostgres();
    const { id } = event.context.params;

    try {
        const userResult = await sqlSelect`SELECT id FROM users WHERE id = ${id}`;
        
        if (userResult.length === 0) {
            return { success: false, message: 'User does not exist or token is invalid' };
        }
        
        const userId = userResult[0].id;

        const [statsResult] = await sqlSelect`
            SELECT 
                (SELECT COUNT(*) FROM users_followings WHERE user_id_following = ${userId}) AS subscribers,
                (SELECT COUNT(*) FROM posts WHERE user_id = ${userId}) AS postCount
        `;

        // Close database connection after the query
        event.waitUntil(sqlSelect.end());

        return { 
            success: true, 
            statistics: {
                viewers: 0,
                subscribers: statsResult.subscribers,
                postCount: statsResult.postcount,
                comments: 0,
                likes: 0
            }
        };
    } catch (error) {
        console.error('Error retrieving statistics from PostgreSQL:', error);
        return { success: false, message: 'Database error' };
    } finally {
        // Ensure database connection is closed
        await sqlSelect.end();
    }
});
