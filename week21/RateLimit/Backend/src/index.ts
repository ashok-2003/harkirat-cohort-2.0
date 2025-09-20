// so now here we will write our logic for the otp generation and password reset 

import express from "express"
import rateLimit from 'express-rate-limit';
const app = express();
const Port = 3000;
app.use(express.json());

// creating a record similar to set or map 
const otpStore: Record<string, string> = {};


const otpLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 3, // Limit each IP to 3 OTP requests per windowMs
    message: 'Too many requests, please try again after 5 minutes',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// so now getting the endpoints 

app.post("/generate-otp",otpLimiter,(req, res) => {
    const email = req.body.email;
    if (!email) {
        res.status(400).json({
            message: "Email is required"
        })
    } else {
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // generates a 6-digit OTP
        otpStore[email] = otp;

        console.log(`otp for ${email} is ${otp}`)
        res.status(200).json({
            message: "Otp sent and logged in console"
        })

    }
})

app.post("/reset-passowrd" , (req , res) => {
    const {email , otp , newPassword} = req.body;
    if(!email || !otp || !newPassword){
        res.status(400).json({
            message : "please send new password and otp and email"
        })
    }else{
        // validate the otp here 
        if(otp === otpStore[email]){
            console.log(`passowrd of ${email} has been reset to this password ${newPassword}`);
            delete otpStore[email]; // clear the recent otp
            res.status(200).json({
                message:"passoword reset succesfully"
            })
        }else{
            res.status(401).json({
                message: "Invalid otp"
            })
        }
    }
})

app.listen(Port, () => {
  console.log(`Server running on http://localhost:${Port}`);
});

