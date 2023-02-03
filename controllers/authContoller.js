const catchasync = require("../utils/catchAsync")
const JWT = require("jsonwebtoken")
const User = require("../models/userMoodel")
const appError = require("../utils/appError")
const crypto = require("crypto")
const { promisify } = require("util")

const signToken = id => {
    return JWT.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
}

const createSendToken = (user,statusCode,res) => {
    const token = signToken(user._id)
    const cookieOption = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN *24 * 60 * 60 * 1000),
        httponly:true,
    }
    if(process.env.NODE_ENV === "production") cookieOption.secure = true

    res.cookie("jwt",token,cookieOption);
    user.password = undefined;
    res.status(statusCode).json({
        status: "sucess",
        token: token,
        data:{user},
    })
}

exports.signUp = catchasync(async (req,res) => {
    const newUser = await User.create(req.body)
    newUser.password = undefined;
    res.status(200).json({
        status:"sucess",
        data:{user},
    })
})

exports.login = catchasync(async (req,res,next) => {
    const {email,password} = req.body;
    if(!email || !password) {
        return next(new appError("il faut spécifier un mot de passe et un email",400));
    }
    const user = await User.findOne({email}).select("+password")
    if(!user || !(await user.correctPassword(password,user.password))){
        return next(new appError("email ou mot de passe incorrect",401));
    }
    createSendToken(user,200,res);
})

exports.logout = (res) => {
    res.cookie("jwt","logout",{
        expires:new Date(Date.now()+10*1000),
        httpOnly:true
    });
    res.status(200).json({status:"sucess"});
}