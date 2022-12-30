import express from 'express';
import { authenticateToken } from '../auth/auth.controller';
import {
  findUser
} from './user.controller';
import { create } from './user.model';


const userRoute = express.Router();

userRoute.get('/', )
userRoute.get('/:userId', findUser)
userRoute.post('/', create);


export default userRoute;
