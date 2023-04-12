const bcrypt = require("bcryptjs")
const User = require("../model/userModel")

exports.signup = async (req, res) => {
    try {
        let body = req.body
        body.password = await bcrypt.hash(body.password, 8)

        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch {
        res.status(400).json({
            status: "Fail",
            message: "Couldn't parse the data, wrong data sent to api"
        })
    }
}

exports.login = async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            const result = await bcrypt.compare(req.body.password, user.password)
            if (result) {
                res.status(201).json(user)
            }
            else {
                res.status(400).json({
                    status: "Fail",
                    message: "Not found"
                })
            }

        } else {
            res.status(400).json({
                status: "Fail",
                message: "Not found"
            })
        }
    } catch {
        res.status(400).json({
            status: "Fail",
            message: "Not found"
        })
    }


}

exports.getUsers = async (req, res) => {

    try {

        const users = await User.find(req.body)
        res.status(200).json({
            message: "gET ALL USERS",
            users
        })
    }

    catch {
        res.status(400).json({
            message: "failed"
        })
    }


}

