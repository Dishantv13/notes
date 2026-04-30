import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import ApiError from '../utils/apiError.js';
import { HTTP_STATUS } from '../utils/httpCode.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const registerUser = async (userData) => {
  const { name, email, password } = userData;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, 'User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (!user) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid user data');
  }

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  };
};

export const loginUser = async (credentials) => {
  const { email, password } = credentials;

  const user = await User.findOne({ email });

  if (user && (await user.isPasswordCorrect(password))) {

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    };
  } else {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid email or password');
  }
};

export const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
  }

  const isCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isCorrect) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Incorrect current password');
  }

  const isSame = await user.isPasswordCorrect(newPassword);
  if (isSame) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'New password cannot be the same as the current password');
  }

  user.password = newPassword;
  await user.save();
  return true;
};


export const editUser = async (userId, name) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
  }
  
  if(!name){
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Name is required');
  }

  user.name = name;
  await user.save();
  return user;
};