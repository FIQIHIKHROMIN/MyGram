const router = require('express').Router()
const UserController = require("../controllers/UserController")
const { authentication, authorization } = require("../middlewares/auth")

router.get("/", UserController.getUsers)
router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.put("/:id", authentication, authorization, UserController.updateUser)
router.delete("/:id", UserController.deleteUserById)

module.exports = router
