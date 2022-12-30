import express from 'express';
import { authenticateToken, changePassword, loginUser, logout, sendOtpForForgetPassword, signUpUser, verifySignupCredentials } from './auth.controller';


const authRoute = express.Router();

authRoute.post('/signup', signUpUser)
authRoute.post('/login', loginUser)
authRoute.post('/logout', logout)

// to authenticate user by the email
authRoute.get("/authenticate-signup/:userId/:otp", verifySignupCredentials)

// to send otp to user on email to change password
authRoute.get('/forget-password/', sendOtpForForgetPassword)

// to chnage the user password
authRoute.post('/change-password/:userId/:otp', changePassword)

// Authenticate User by it's cookies!
authRoute.post('/protected', authenticateToken);

export default authRoute;
