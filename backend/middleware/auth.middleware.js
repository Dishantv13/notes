import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import ApiError from '../utils/apiError.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        throw new ApiError(401, 'Not authorized, user not found');
      }
      
      return next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      throw new ApiError(401, `Not authorized, token failed: ${error.message}`);
    }
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized, no token');
  }
});
