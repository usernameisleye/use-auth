const router = require("express").Router();
// Controller
const {
    signup_user,
    login_user,
    logout_user,
    
    forgot_password,
    reset_password,
} = require("../controllers/user.controller");
const authMiddleware = require("../middleware/authMiddleware");

// Routes
router
.route("/signup")
.post(signup_user);

router
.route("/login")
.post(login_user);

// Auth Mid...
router.use(authMiddleware);

router
.route("/logout")
.post(logout_user);

router
.route("/forgot-password")
.post(forgot_password);

router
.route("/reset-password")
.post(reset_password);

module.exports = router;