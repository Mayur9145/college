import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';
import path from 'path';
import User from '../models/user.js';
import userVerification from '../models/userVerification.js';
import PasswordReset from '../models/passwordReset.js';

// __dirname will work in nodejs reple only if we include following 4 lines
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);
//import mongoose from 'mongoose';


import { v4 } from 'uuid'
//const User = mongoose.model("User")
import dotenv from 'dotenv';
dotenv.config();
// const JWT_RESET_PASSWORD = "secretkeY123";
var transporter = nodemailer.createTransport({
    service: 'gmail',
    // port: 465,
    // secure: true, // true for 465, false for other ports
    // logger: true,
    // debug: true,
    // secureConnection: false,
    auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated eethereal password

    },
    // tls: {
    //     rejectUnAuthorized: true
    // }
})

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready to use");
        console.log(success);
    }
})

export const signin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: 'User not found' });
        if (!existingUser.verified) return res.status(404).json({ message: 'User is not verified. Please check your email to verify your account.' });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid Credentials' });
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }

}
export const signup = async(req, res) => {

    const { email, password, confirmPassword, firstName, lastName } = req.body;
    try {

        if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });
        else {
            // const existingUser = await User.findOne({ email });

            User.find({ email })
                .then((result) => {

                    if (result.length) {
                        //user already exists

                        res.status(400).json({
                            message: 'User already exists with this email ID'
                        });
                    } else {
                        const saltRounds = 10;
                        bcrypt.hash(password, saltRounds)
                            .then((hashedPassword) => {
                                const newUser = new User({
                                    email,
                                    password: hashedPassword,
                                    name: `${firstName} ${lastName}`,
                                    verified: false,
                                });

                                newUser
                                    .save()
                                    .then((result) => {
                                        sendEmailVerification(result, res);
                                    })
                                    .catch((err) => {
                                        console.log(err)

                                        res.json({
                                            message: "An error occurred while saving user account"
                                        });
                                    });
                            });
                        // const result = await User
                        //     .create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, verified: false })
                        //     .then((result) => {
                        //         sendEmailVerification(result, res);
                        //     })
                        //     .catch((err) => {
                        //         res.json({ message: "An error occurred while saving user account" })
                        //     })
                    }
                })
                .catch((err) => {
                    res.json({ message: "An error occurred while hashing password" })
                })

        }
        // const hashedPassword = await bcrypt.hash(password, 13);
        // const result = await User
        //     .create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, verified: false })
        //     .then((result) => {
        //         sendEmailVerification(result, res);
        //     })
        //     .catch((err) => {
        //         res.json({ message: "An error occurred while saving user account" })
        //     })
        // const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });
        // res.status(200).json({ result, token });

        //Handle email verification

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }


}

const sendEmailVerification = ({ _id, email }, res) => {
    //url to be used in the email 
    console.log(email);
    const currentUrl = "http://localhost:3000/";

    const uniqueString = v4() + _id;

    //mail options
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Verify your account",
        html: `<p>Verify your email address</p>
        <p>This link expires in 6 hour</p>
        <p>Press 
        <a href=${currentUrl + "user/verify/" + _id + "/" + uniqueString}> here</a>
        to proceed</p> `
    };


    const saltRounds = 10;
    bcrypt.hash(uniqueString, saltRounds)
        .then((hashedUniqueString) => {
            // set value in user verification collection
            const newVerification = new userVerification({
                userId: _id,
                uniqueString: hashedUniqueString,
                createdAt: Date.now(),
                expiresAt: Date.now() + 21600000,
            });

            newVerification
                .save()
                .then(() => {
                    transporter
                        .sendMail(mailOptions)
                        .then(() => {
                            res.json({ message: 'Verification email sent' });
                        })
                        .catch((error) => {
                            console.error(error)
                            res.json({
                                message: "Verification email failed",
                            })
                        })
                })
                .catch((error) => {
                    res.json({
                        message: "Could not save the verification email data",
                    });
                })
        })
        .catch(() => {
            res.json({
                message: "An error occured while hashing email data"
            });
        });
};

// verify email data

export const emailVerification = async(req, res) => {
    let { userId, uniqueString } = req.params;


    userVerification
        .find({ userId })
        .then((result) => {

            if (result.length > 0) {
                console.log(result);
                //user verification record exists so we proceed to
                const { expiresAt } = result[0];
                console.log(expiresAt);
                const hashedUniqueString = result[0].uniqueString;

                //checking for expired unique String
                if (expiresAt < Date.now()) {
                    //record has expired so we delete isEmpty
                    userVerification
                        .deleteOne({ userId })
                        .then(result => {
                            User
                                .deleteOne({ _id: userId })
                                .then(() => {
                                    let message = "Link has expired. Please sign up again.";
                                    res.redirect(`/user/verified/error=true&message=${message}`);
                                })
                                .catch(error => {
                                    let message = "Clearing user with expired unique string failed ";
                                    res.redirect(`/user/verified/error=true&message=${message}`);
                                })
                        })
                        .catch((error) => {
                            console.log(error);
                            let message = "An error occurred while clearing expired user verification record";
                            res.redirect(`/user/verified/error=true&message=${message}`);
                        })
                } else {
                    // valid record exists so we validate the user string
                    //First compare the hased unique string


                    bcrypt
                        .compare(uniqueString, hashedUniqueString)
                        .then(result => {
                            if (result) {

                                //strings match
                                User
                                    .updateOne({ _id: userId }, { verified: true })
                                    .then(() => {
                                        userVerification
                                            .deleteOne({ userId })
                                            .then(() => {
                                                res.sendFile(path.join(__dirname, "./../views/verified.html"))
                                            })
                                            .catch(error => {
                                                console.log(error);
                                                let message = "An error occurred while finalizing successful verification";
                                                res.redirect(`/user/verified/error=true&message=${message}`);

                                            })
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        let message = "An error occurred while updating user record to show verified.";
                                        res.redirect(`/user/verified/error=true&message=${message}`);

                                    })
                            } else {
                                //existing record but incorrect verification details passed.
                                let message = "Invalid verification details assed. Check your inbox.";
                                res.redirect(`/user/verified/error=true&message=${message}`);

                            }
                        })

                }

            } else {
                //user verification record does not exist
                let message = "Account record doesn't exist or has been verified already. Please sign up or log in";
                res.redirect(`/user/verified/error=true&message=${message}`);
            }
        })
        .catch((error) => {
            console.log(error);
            let message = "An error occured while checking for existing user verification record.";
            res.redirect(`/user/verified/error=true&message=${message}`);
        })


}

export const emailVerified = async(req, res) => {
    res.sendFile(path.join(__dirname, './../views/verified.html'));
}


export const requestPasswordReset = async(req, res) => {
    const { email, redirectUrl } = req.body;
    //check if email exists

    User.find({ email })
        .then((data) => {
            if (data.length) {
                //user exists
                //check if user is Verified

                if (!data[0].verified) {
                    res.json({
                        status: "FAILED",
                        message: "Email hasn't been verified yet. Please check your inbox."
                    })
                } else {
                    //proceed with email to reset password
                    // console.log(data)

                    sendResetEmail(data[0], redirectUrl, res);

                }

            } else {
                res.json({
                    status: "FAILED",
                    message: "No account with the supplied email exists."
                })
            }
        });
}

//send password reset email

const sendResetEmail = ({ _id, email }, redirectUrl, res) => {
    const resetString = v4() + _id;

    //first we clear all existing records

    PasswordReset
        .deleteMany({ userId: _id })
        .then(result => {
            //reset records deleted successfully
            //Now we send the email to the

            //mail options
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Password reset",
                html: `<p>Please use the link below to reset your password</p>
                <p>This link expires in 1 hour</p>
                <p>Press this
                <a href=${redirectUrl + "/" + _id + "/" + resetString}> link</a>
                to proceed</p> `
            };

            //hash the reset string
            const saltRounds = 10;
            bcrypt
                .hash(resetString, saltRounds)
                .then(hashedResetString => {
                    //set values in password reset collection
                    const newPasswordReset = new PasswordReset({
                        userId: _id,
                        resetString: hashedResetString,
                        createdAt: Date.now(),
                        expiresAt: Date.now() + 3600000
                    });

                    newPasswordReset
                        .save()
                        .then(() => {
                            transporter
                                .sendMail(mailOptions)
                                .then(() => {
                                    //reset email sent and password reset record saved
                                    // res.sendFile(path.join(__dirname, "./../views/resetpassword.html"))
                                    res.json({
                                        status: "PENDING",
                                        message: "reset password email sent."
                                    })
                                    console.log("reset password email sent")
                                        // res.json({ message: "Password reset email sent" });
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.json({
                                        status: "FAILED",
                                        message: "Password reset email failed."
                                    })
                                })
                        })
                        .catch(err => {
                            console.log(error);
                            res.json({
                                status: "FAILED",
                                message: "Could not save password reset data."
                            });
                        })
                })
                .catch(error => {
                    console.log(error);
                    res.json({
                        status: "FAILED",
                        message: "An error occured while hashing the password reset data."
                    })
                })

        })
        .catch(error => {
            //error while clearing existing records
            console.log(error)
            res.json({
                status: "FAILED",
                message: "Clearing existing password reset records failed"
            });

        })
}

export const resetPassword = async(req, res) => {
    let { userId, resetString, newPassword } = req.body;
    // console.log(userId)
    PasswordReset
        .find({ userId })
        .then(result => {
            console.log(result)
            if (result.length > 0) {
                //password reset record exists so we proceed
                const { expiresAt } = result[0];
                const hashedResetString = result[0].resetString;

                //checking for expired reset strings
                if (expiresAt < Date.now()) {
                    PasswordReset
                        .deleteOne({ userId })
                        .then(() => {
                            //Reset record deleted successfully
                            res.json({ message: "Password reset link has expired" })
                        })
                        .catch(error => {
                            //deletion failed
                            console.log(error);
                            res.json({ message: "Clearing password reset record failed." })
                        })
                } else {
                    //valid reset record exists so we validate the reset strings
                    //first compare the hashed reset string 
                    console.log("result")
                    bcrypt
                        .compare(resetString, hashedResetString)
                        .then((result) => {

                            if (result) {
                                //strings matched
                                //hash password again

                                const saltRounds = 10;
                                bcrypt
                                    .hash(newPassword, saltRounds)
                                    .then((hashedNewPassword) => {
                                        //update user password 
                                        User
                                            .updateOne({ _id: userId }, { password: hashedNewPassword })
                                            .then(() => {
                                                //update complete

                                                PasswordReset
                                                    .deleteOne({ userId })
                                                    .then(() => {
                                                        //both user record and reset record updated
                                                        res.json({
                                                            status: "SUCCESS",
                                                            message: 'Password has been reset successfully'
                                                        })
                                                    })
                                                    .catch(error => {
                                                        console.log(error);
                                                        res.json({ message: "An error occured while finalizing password reset." });
                                                    })
                                            })
                                            .catch((err) => {
                                                console.log(err);
                                                res.json({ message: "Updating user password failed" });
                                            })

                                    })
                                    .catch(error => {
                                        console.log(error);
                                        res.json({ message: "An error occurred while hashing new password" })
                                    })

                            } else {
                                res.json({ message: "Invalid password reset details passed." })
                            }

                        })
                        .catch(error => {
                            res.json({ message: "Comparing password reset strings failed." })
                        })
                }
            } else {
                res.json({ message: 'Password reset request not found.' })
            }
        })
        .catch(error => {
            console.log(error);
            res.json({ message: "Checking for existing password reset failed." })
        })
}


export const forgotPasswordController = async(req, res) => {

    const { email } = req.body;
    const errors = validationResult(req);
    //console.log(errors);

    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            errors: firstError
        });
    } else {
        //console.log('No error')
        User.findOne({
                email
            },
            (err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                        error: 'User with that email does not exist'
                    });
                }

                const token = jwt.sign({
                        _id: user._id
                    },
                    JWT_RESET_PASSWORD, {
                        expiresIn: '10m'
                    }
                );

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'no-replay@testban.com',
                        pass: '123ban'
                    }
                });
                const emailData = {
                    from: "no-replay@testban.com",
                    to: email,
                    subject: `Password Reset link`,
                    html: `
                      <h1>Please use the following link to reset your password</h1>
                      <p>http://localhost:3001/users/password/reset/${token}</p>
                      <hr />
                      <p>This email may contain sensetive information</p>
                      <p>http://localhost:3001</p>
                  `
                };

                //console.log(emailData);

                return user.updateOne({
                        resetPasswordLink: token
                    },
                    (err, success) => {
                        if (err) {
                            console.log('RESET PASSWORD LINK ERROR', err);
                            return res.status(400).json({
                                error: 'Database connection error on user password forgot request'
                            });
                        } else {

                            transporter.sendMail(emailData, function(error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });
                            // sgMail.send(emailData).then(sent => {
                            //     console.log('SIGNUP EMAIL SENT', sent)
                            //     return res.json({
                            //         message: `Email has been sent to ${email}. Follow the instruction to activate your account`
                            //     })
                            // }).catch(err => {
                            //     console.log('SIGNUP EMAIL SENT ERROR', err)
                            //     return res.json({
                            //         message: err.message
                            //     });
                            // });
                        }
                    }
                );
            }
        );
        // });
    }
};

// export const resetPassword = async(req, res) => {

//     //crypto.lib.WordArray.random

//     crypto.randomBytes(64, (err, buffer) => {
//         if (err) {
//             console.log(err)
//         }
//         console.log("Me");

//         const token = buffer.toString("hex")
//         User.findOne({ email: req.body.email })
//             .then(user => {
//                 if (!user) {
//                     return res.status(422).json({ error: "User dont exists with that email" })
//                 }
//                 user.resetToken = token
//                 user.expireToken = Date.now() + 3600000
//                 user.save().then((result) => {
//                     transporter.sendMail({
//                         to: user.email,
//                         from: "no-replay@insta.com",
//                         subject: "password reset",
//                         html: `
//                     <p>You requested for password reset</p>
//                     <h5>click in this <a href="http://localhost:3001/reset/${token}">link</a> to reset password</h5>
//                     `
//                     })
//                     res.json({ message: "check your email" })
//                 })

//             })
//     })



//}