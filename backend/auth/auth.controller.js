import { authenticateUserByToken, changeUserPassword, login, logoutUser, sendOtpoChangePassword, signup, verifyCredentials } from "./auth.service"

export const signUpUser = (req, res) => {
    signup(req, res);
}

export const loginUser = (req, res) => {
    login(req, res);
}

export const verifySignupCredentials = (req, res) =>{
    verifyCredentials(req, res);
}

export const sendOtpForForgetPassword = (req, res) => {
    sendOtpoChangePassword(req, res);
}

export const changePassword = (req, res) => {
    changeUserPassword(req, res);
}

export const logout = (req, res) => {
    logoutUser(req, res);
}

export const authenticateToken = (req, res) => {
    authenticateUserByToken(req, res);
}


