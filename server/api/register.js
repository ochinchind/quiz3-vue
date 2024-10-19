
import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
    const body = await readBody(event); 
  
    const filePath = path.join(process.cwd(), 'data', 'users.json');
  
    let existingData = [];
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      existingData = JSON.parse(data);
    } catch (error) {
      console.log('Error reading file:', error);
    }
  
    const nextId = existingData.length > 0 ? Math.max(...existingData.map(user => user.id)) + 1 : 1;
  
    const newUser = {
      id: nextId,
      activated: false,
      ...body,
    };
  
    existingData.push(newUser);
  
    try {
      await fs.writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf-8');
      return { success: true, message: 'User data saved successfully', userId: newUser.id };
    } catch (error) {
      console.error('Error writing file:', error);
      return { success: false, message: 'Failed to save user data' };
    }
});