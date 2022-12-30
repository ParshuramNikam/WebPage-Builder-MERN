import emailValidator from '../helpers/emailValidator';
import hashing from '../helpers/hashing';
import generateToken from "../helpers/generateToken";
import generateUniqueString from '../helpers/generateUniqueString';
import sendMailToUser from '../helpers/sendMailToUser';
import User from '../user/user.model';
import Pages from '../page/page.modal';
import bcrypt from 'bcrypt';
import { publicWebPageTemplates } from '../assets/assets.controller';
const jwt = require('jsonwebtoken');

export const signup = async (req, res) => {
    try {
        let { password, email, fullName } = req.body;
        email = email.toLowerCase().trim();

        if (!email || !password || !fullName) {
            return res.status(200).json({ status: "failed", message: "email, password, fullName required!", });
        }

        const isEmail = emailValidator(email);
        if (!isEmail) return res.status(400).json({ status: "failed", message: "Not a valid Email Address" });

        const isAlreadyRegistered = await User.findOne({ email: email });
        console.log("already registerd users found :->> \n", isAlreadyRegistered, "<<-");

        if (isAlreadyRegistered) console.log(isAlreadyRegistered._id, isAlreadyRegistered.verified)

        if (isAlreadyRegistered && isAlreadyRegistered.verified) return res.status(403).send({ status: "failed", message: "User Already Registered" });
        if (isAlreadyRegistered) return res.status(403).send({ status: "failed", message: "User Already Registered But NOT verified!" });

        let userOTP = await Date.now();

        const initialUser = new User({
            email,
            fullName,
            otp: userOTP,
            verified: false,
            password: hashing(password),
        })
        const newUser = await initialUser.save();

        // add public templates to user pages
        const templates = await Pages.insertMany(publicWebPageTemplates(newUser._id));
        if(templates) console.log('Template added to new user');
        else console.warn('templates not added some error occured');

        // console.log(">> email will be sent to user : " + email + " by me:" + process.env.GMAIL_USER);
        const isEmailSent = await sendMailToUser(email, 'send-otp-link', `${process.env.BACKEND_URL}/auth/authenticate-signup/${newUser._id}/${userOTP}`);

        if (!isEmailSent) return res.status(500).json({ status: "failed", message: "Email not sent to user" });

        return res.status(200).json({ status: "success", message: "Email sent to you. Please verify your credentials!" });

    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: "Failed",
            message: error
        });
    }
};

export const login = async (req, res) => {
    try {
        console.log("req.body:- ", req.body);
        let { password } = req.body;
        let email = req.body.email.toLowerCase().trim();
        console.log(req.body.email);

        if (!email || !password) return res.status(400).send({ status: "failed", message: "Email and Password is Required!" });

        const user = await User.findOne({ email: email });
        console.log(user);
        if (!user) return res.status(200).send({ message: "User Not Exits" });

        // -------------- ADD This to route for verified user  required! ---------------
        if (!user.verified) return res.status(400).send({ status: "failed", message: "Please verify your credientials by Link sent on your emailID!" })
        // -------------- xxxxxxxxxxxxxxxxxxxxxxx ---------------

        const isValidPassword = bcrypt.compareSync(password, user.password);
        console.log(isValidPassword);
        if (!isValidPassword) return res.status(400).send({ status: "failed", message: 'Invalid Credientials' });

        // create a signed Token for the user. 
        const signedToken = await generateToken(user._id);

        console.log("🚀 ~ file: login.middleware.js ~ line 82 ~ login ~ signed̥Token", signedToken)

        // save token in cookies 
        await res.cookie("access_token", signedToken, {
            // expire duration:- 1 month = 31days * 24 hours * 1hour
            expires: new Date(Date.now() + 31 * 24 * 3600000) // 3600000 millisec = 1 hour -> cookie will be removed after 1 months
            // secure: true, // use in production
        });

        // // check device already having any token -> if yes then delete it from DB:
        // const alreadyHavingToken = accessToken;
        // console.log("- alerady having token : "+ alreadyHavingToken);
        // if (alreadyHavingToken) await User.findOneAndUpdate({ email }, { $pull: { token: alreadyHavingToken } });

        await User.findOneAndUpdate({ email }, { $push: { token: signedToken } })


        res.status(200).json({
            status: "success",
            message: 'login success',
            access_token: signedToken,
            userId: user._id
        });

    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: "Failed",
            message: error.message,
            error,
        });
    }
}

export const sendOtpoChangePassword = async (req, res) => {
    try {
        const { email } = req.query;

        const user = await User.findOne({ email });
        console.log(email, user);
        if (!user) return res.status(400).send({ status: "failed", message: "Email address is not registered!" })

        const userOTP = await generateUniqueString(8);

        await User.findByIdAndUpdate(user._id, { otp: userOTP, otpTimeStamp: new Date() });

        const isEmailSentSucessfully = sendMailToUser(email, 'change-password', `${process.env.APP_URL}/change-password/${userOTP}/${user._id}`);

        if (!isEmailSentSucessfully) {
            return res.status(400).send({ status: "failed", message: "Email not sent to user!" })
        }

        res.status(200).send({ status: "success", message: "Email sent to user!" })
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: "failed", message: error.message, error });
    }
}

export const changeUserPassword = async (req, res) => {
    try {
        console.log("in change user password");
        const { userId, otp } = req.params;
        const { password, cpassword } = req.body;
        console.log(userId, otp, password, cpassword);

        if (password !== cpassword) return res.status(400).send({ status: "failed", message: "Passwords not match! Try again." })

        const user = await User.findOne({ _id: userId });
        console.log(">>" + user);
        if (!user) return res.status(400).send({ status: "failed", message: "User is not registered!" });

        if (otp !== user.otp) return res.status(400).send({ status: "failed", message: "OTP incorrect!" });

        const isBothPasswordSame = bcrypt.compareSync(password, user.password);
        console.log(isBothPasswordSame);
        if (isBothPasswordSame) return res.status(400).send({ status: "failed", message: "Password should be different from last password!" })

        const hashedPassword = await bcrypt.hashSync(password, 10);
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, { password: hashedPassword, otp: null, otpTimeStamp: null });
        console.log(updatedUser);

        res.status(200).send({ status: "success", message: "Password Updated Sucessfully! Login with new password." });

    } catch (error) {
        console.log(error);
        res.status(400).send({ status: "failed", message: error.message, error })
    }
}

export const logoutUser = async (req, res) => {

    try {
        console.log("logout user process started ... ");
        const { accessToken } = req.body;
        if (!accessToken || accessToken === null || accessToken.length === 0) {
            return res.status(302).json({ status: "success", message: "Logout successful! But User doesn't have valid/No Access_Token" })
        }

        const decodedToken = jwt.decode(accessToken);
        console.log(decodedToken);

        // to logout user from a single device having this access_token:
        // await User.findOneAndUpdate({_id: decodedToken.userId},{$pull: {token: accessToken}});

        // to logout user from all devices:-
        const user = await User.findOneAndUpdate({ _id: decodedToken._id }, { token: [] }, { new: true });

        console.log(accessToken)
        console.log(user)

        return res.status(200).json({ status: "success", message: "Logout Succesful! & Token deleted.", user: user });

    } catch (error) {
        res.status(400).json({ status: "failed", message: error.message, error });
    }
}

export const verifyCredentials = async (req, res) => {
    try {
        const { userId, otp } = req.params;
        console.log(userId, otp);

        if (!userId || !otp) return res.status(400).send({ status: "failed", message: "Required fields not present in URL params." })

        const isAlreadyRegistered = await User.findOne({ _id: userId });
        console.log("already registerd users found :->> \n", isAlreadyRegistered, "<<-");

        if (!isAlreadyRegistered) return res.status(400).send({ status: "failed", message: "User is not registered! No user found with these credentials" })

        if (isAlreadyRegistered && isAlreadyRegistered.verified) {
            console.log("User Already Registered & verified");
            return res.status(200).redirect(`${process.env.APP_URL}/login`);
        }

        if (otp !== isAlreadyRegistered.otp) {
            return res.status(400).send({ status: "failed", message: "Your credientials are not verified! Invalid/Expired OTP!" })
        }

        // create a signed Token for the user. 
        const signedToken = await generateToken(isAlreadyRegistered._id);

        res.cookie("access_token", signedToken, {
            expires: new Date(Date.now() + 24 * 3600000) // cookie will be removed after 24 hours
            // secure: true, // use in production
        });

        const updatedUser = await User.findOneAndUpdate({ email: isAlreadyRegistered.email }, {
            otp: null,
            verified: true,
            $push: { token: signedToken },
        })

        console.log(updatedUser);

        const isEmailSentSucessfully = sendMailToUser(isAlreadyRegistered.email, 'sign-up');

        if (!isEmailSentSucessfully) {
            return res.status(400).send({ status: "failed", message: "Email not sent to user!" })
        }

        res.status(200).redirect(`${process.env.APP_URL}/login`);

    } catch (error) {
        console.log(error);
        res.status(400).send({ status: "failed", message: error.message, error })
    }
}

export const authenticateUserByToken = async (req, res) => {
    try {
        console.log(req.body);
        const accessToken = req.body.accessToken || req.cookies['access_token'];

        console.log(">>>>>>>>>>>>>", accessToken, "<<<<<<<<<<<<");

        if (!accessToken || accessToken.length === 0) {
            return res.status(302).json({ status: "failed", message: "User is Not verified!" })
        }

        const decodedToken = jwt.decode(accessToken);
        console.log(decodedToken);

        const user = await User.findOne({ _id: decodedToken._id });
        // console.log(user);

        if (!user) return res.status(400).send({ status: "failed", message: "Access Denied! Invalid User credentials!" });

        const isBothTokensSame = user.token.includes(accessToken);
        console.log(isBothTokensSame);

        if (!isBothTokensSame) return res.status(400).send({ status: "failed", message: "Access Denied! Token is not present in DB" });

        return res.status(302).json({ status: "success", user: user, message: "User is verified!" })
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: "failed", message: error.message, error });
    }
}
