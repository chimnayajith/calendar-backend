const User = require("../../models/userModel");
const { sendOtp } = require("../otp/sendOtp");

const sendResetMail = async (email) => {
    try {
        const existingUser = await User.findOne({email});

        if(!existingUser){
            throw Error("No user with the provided mail address.")
        }

        // only users holding verified mail address can use the forgot password optioin.
        if(!existingUser.isVerified){
            throw Error("Email address is not verified.")
        }

        const createdOtp = await sendOtp({
            email : email,
            subject : "Forgot Password?",
            message: "You've requested a password reset. Please use the following OTP to proceed with password reset."
        });
        return createdOtp;
    } catch (error) {
        
    }
};

module.exports = sendResetMail;