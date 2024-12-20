import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const headers = event.req.headers; 
  const sqlSelectUser = usePostgres();
  const sqlSelect = usePostgres();
  const sqlInsertDelete = usePostgres();
  const sqlSelectUsername = usePostgres();

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
      const user_id_following = body.user_id; 

      const followingResult = await sqlSelect`
          SELECT * FROM users_followings 
          WHERE user_id = ${authenticatedUserId} 
          AND user_id_following = ${user_id_following}
      `;

      event.waitUntil(sqlSelect.end());

      if (followingResult.length > 0) {
          await sqlInsertDelete`
              DELETE FROM users_followings 
              WHERE user_id = ${authenticatedUserId} 
              AND user_id_following = ${user_id_following}
          `;
          event.waitUntil(sqlInsertDelete.end());
          return { success: true, message: `You have unfollowed the user with ID ${user_id_following}` };
      } else {
        const userToFollowResult = await sqlSelectUsername`
            SELECT username FROM users WHERE id = ${user_id_following}
        `;
        event.waitUntil(sqlSelectUsername.end());

            if (userToFollowResult.length === 0) {
                return { success: false, message: 'User to follow does not exist' };
            }

            const usernameToFollow = userToFollowResult[0].username;

            // Follow the user and insert into `users_followings` with name
            await sqlInsertDelete`
                INSERT INTO users_followings (user_id, user_id_following, name) 
                VALUES (${authenticatedUserId}, ${user_id_following}, ${usernameToFollow})
            `;
          event.waitUntil(sqlInsertDelete.end());
          return { success: true, message: `You are now following the user with ID ${user_id_following}` };
      }

  } catch (error) {
      console.log('Error connecting to PostgreSQL:', error);
      return { success: false, message: 'Database error' };
  } finally {
      await sqlInsertDelete.end();
  }
});