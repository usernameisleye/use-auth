const { 
    signup, 
    login, 
    logout,
    forgotPassword,
    resetPassword
} = require("../services/user.service");

// route POST /api/user/signup
// @access Public
const signup_user = async (req, res) => {
    const signup_service = await signup(req.body, res);
    res.status(201)
    .json(signup_service);
};

// route POST /api/user/login
// @access Public
const login_user = async (req, res) => {
    const login_service = await login(req.body, res);
    res.json(login_service);
};

// route POST /api/user/logout
// @access Private
const logout_user = (req, res) => {
    const logout_service = logout(res);
    res.json(logout_service);
};

// route POST /api/user/forgot-password
// @access Private
const forgot_password = async (req, res) => {
    const forgot_password_service = await forgotPassword(
        res,
        req.body.email
    );
    res.json(forgot_password_service);
};

// route POST /api/user/reset-password
// @access Private
const reset_password = async (req, res) => {
    const reset_password_service = await resetPassword(
        res,
        req.query.id,
        req.query.token,

        req.body.password,
        req.body.confirmPassword
    );
    res.json(reset_password_service);
};

module.exports = {
    signup_user,
    login_user,
    logout_user,

    forgot_password,
    reset_password,
};