import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'task_manager_super_secret';

export const generateToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};
