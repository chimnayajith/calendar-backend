const express = require('express');
const { sendOtp } = require('../utils/otp/sendOtp');
const router = express.Router();

router.post("/"  , async(req , res) => {
    try {
        const {email , subject , message , duration} = req.body;

        const createdOtp = await sendOtp({
            email,
            subject,
            message,
            duration
        });
        res.status(200).json(createdOtp);
    } catch (error) {
        res.status(400)
    }
});

module.exports = router;