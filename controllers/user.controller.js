const response = require("../utils/response")
const { signup, login, logout, forgotPassword, resetPassword } = require("../services/user.service")

const signup = async (req, res) => {
    const r = await signup(req.body, res)
    res.status(201).json(response.success("User signed up", r))
}

const login = async (req, res) => {
    const r = await login(req.body, res)
    res.status(200).json(response.success("User signed in", r))
}

const logout = (req, res) => {
    const r = logout(res)
    res.status(200).json(response.success("User logged out", r))
}

const forgot = async (req, res) => {
    const r = await forgotPassword(res, req.body.email)
    res.status(200).json(response.success("Success", r))
}

const reset = async (req, res) => {
    const { id, token } = req.query
    const { password, confirmPassword } = req.body
    const r = await resetPassword(res, id, token, password, confirmPassword)
    res.status(200).json(response.success("Success", r))
}

module.exports = { signup, login, logout, forgot, reset }