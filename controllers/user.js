var final = require('../moduls/user');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.secure = async function (req, res, next) {
    try {
        // token check
        console.log(req.headers.token);
        let token = req.headers.token
        if(!token){
            throw new Error("Token is not found")
        }

        var decoded = await jwt.verify(token, 'Katargam');
        console.log(decoded);

        let checkUser = await final.findById(decoded.id)

        if(!checkUser){
            throw new Error("User not found")
        }

        next()
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.SignUp = async function (req, res, next) {
    try {
        if (req.body.password != req.body.cpassword) {
            throw new Error("password and conform password is not same")
        }
        if (!req.body.name || !req.body.email) {
            throw new Error("please field the data")
        }

        req.body.password = await bcrypt.hash(req.body.password, 10)
        let data = await final.create(req.body)

        let token = await jwt.sign({ id: data._id }, 'Katargam');


        res.status(201).json({
            status: "success",
            message: "User create successful",
            data: data,
            token
        })

    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.Login = async function (req, res, next) {
    try {
        let user = await final.findOne({ email: req.body.email })
        console.log(user);
        if (!user) {
            throw new Error("Data is not found")
        }
        let cheak = await bcrypt.compare(req.body.password, user.password)
        if (!cheak) {
            throw new Error("password is not found")
        }

        let token = await jwt.sign({ id: user._id }, 'Katargam');

        res.status(201).json({
            status: "success",
            message: "loging successfull",
            data: user,
            token
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.allUsers = async function (req, res, next) {
    try {
        let users = await final.findById()
        res.status(201).json({
            status: "success",
            message: "all data found",
            data: users
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.user = async function (req, res, next) {
    try {
        let users = await final.findById(req.query.id)
        res.status(201).json({
            status: "success",
            message: "all data found",
            data: users
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}