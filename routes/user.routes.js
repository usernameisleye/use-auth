const router = require("express").Router()
const auth = require("../middleware/auth.middleware")
const { signup, signin, signout, forgot, reset } = require("../controllers/user.controller")

// Routes
router.post("/signup", signup)

router.post("/signin", signin)

router.use(auth)

router.post("/signout", signout)

router.post("/forgot-password", forgot)

router.post("/reset-password", reset)

module.exports = router