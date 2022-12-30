const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    token: [String],
    otp: {
        type: String,
        default: null,
        // expires: '86400'  // 24 * 3600sec => 24 hours => 1 day 
    },
    otpTimeStamp: {
        type: Date,
        default: null,
        expires: '86400'
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;