const bcrypt = require("bcryptjs")
const userModel = require("../../models/userModel")
const jwt = require('jsonwebtoken');

async function userSigInController(req, res) {
    try {
        const { email, password } = req.body

        if (!email) {
            throw new Error("Please provide email")
        }
        if (!password) {
            throw new Error("Please provide email")
        }

        const user = await userModel.findOne({ email })

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!user) {
            throw new Error("User not found")
        }
        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email
            }

            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 });
            const tokenOption = {
                httpOnly: true,
                secure: true

            }

            res.cookie("token", token, tokenOption).status(200).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false
            })
        }
        else {
            throw new Error("Please check Password")
        }



    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userSigInController
