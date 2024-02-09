const OTP = require("../../models/otpModel")
const generateOtp = require("../otp/generateOtp");

const sendOtp = async ({email , subject , message , duration = 0.25}) => {
    try {
        // throws error in case of empty fields
        if(!(email && subject && message)){
            throw Error("Provide values for email,subject and messasge")
        };

        // clears any existing record
        await OTP.deleteOne({email});


    } catch (error) {
        
    }
};