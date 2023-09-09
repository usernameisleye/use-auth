const response = require("../utils/response")
const UserService = require("../services/user.service")
const userValidator = require("../utils/validators/user")

const signup = async (req, res) => {
    const { value: body } = userValidator.validate(req.body)
    const r = await UserService.signup(body, res)
    res.status(201).json(response.success("User signed up", r))
}

const signin = async (req, res) => {
    const { value: body } = userValidator.validate(req.body)
    const r = await UserService.signin(body, res)
    res.status(200).json(response.success("User signed in", r))
}

const signout = (req, res) => {
    const r = UserService.signout(res)
    res.status(200).json(response.success("User logged out", r))
}

const forgot = async (req, res) => {
    const r = await UserService.forgotPassword(res, req.body.email)
    res.status(200).json(response.success("Success", r))
}

const reset = async (req, res) => {
    const { id, token } = req.query
    const { password, confirmPassword } = req.body
    const r = await UserService.resetPassword(res, id, token, password, confirmPassword)
    res.status(200).json(response.success("Success", r))
}

module.exports = { signup, signin, signout, forgot, reset }