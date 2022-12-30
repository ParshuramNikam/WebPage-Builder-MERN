const jwt = require('jsonwebtoken');

const generateToken = async (userId) => {
    // create a signed Token for the user.
    const signedToken = await jwt.sign(
        {
            _id: userId
        },
        process.env.SECRET_KEY,
        { expiresIn: '48h' }
    );
    return signedToken;
};

export default  generateToken;
