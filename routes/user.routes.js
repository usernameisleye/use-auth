const router = require("express").Router()
const auth = require("../middleware/auth.middleware")
const { signup, login, logout, forgot, reset } = require("../controllers/user.controller")

// Routes
router.post("/signup", signup)

router.post("/login", login)

router.use(auth)

router.post("/logout", logout)

router.post("/forgot-password", forgot)

router.post("/reset-password", reset)

module.exports = router