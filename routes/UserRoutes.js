const router = require('express').Router()
const UserController = require("../controllers/UserController")
const { authentication } = require("../middlewares/auth")

router.get("/", UserController.getUsers)
router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.put("/:id", authentication, UserController.updateUser)
router.delete("/:id", authentication, UserController.deleteUserById)

module.exports = router
