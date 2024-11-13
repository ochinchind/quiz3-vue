import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    const headers = event.req.headers;
    const sqlSelect = usePostgres();
    const { id } = event.context.params;
    const query = getQuery(event);  // Get query parameters from the request
    const { startDate, endDate } = query;

    try {
        // Validate date range
        if (!startDate || !endDate) {
            return { success: false, message: 'Date range is required' };
        }

        const statsResult = await sqlSelect`
            SELECT 
                COUNT(*) AS postcount,  -- lowercase alias
                DATE(created_at) AS postdate  -- lowercase alias
            FROM posts
            WHERE user_id = ${id} AND created_at BETWEEN ${startDate} AND ${endDate}
            GROUP BY postdate
            ORDER BY postdate
        `;

        // Close database connection after the query
        event.waitUntil(sqlSelect.end());

        // Format the results to match the desired response structure
        const statistics = statsResult.map(row => ({
            date: row.postdate,  // Access with lowercase
            postCount: row.postcount,  // Access with lowercase
        }));

        return { 
            success: true, 
            statistics,
        };
    } catch (error) {
        console.error('Error retrieving statistics from PostgreSQL:', error);
        return { success: false, message: 'Database error' };
    } finally {
        // Ensure database connection is closed
        await sqlSelect.end();
    }
});
