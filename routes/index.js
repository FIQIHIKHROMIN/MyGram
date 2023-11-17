const router = require('express').Router()

const userRoutes = require("./UserRoutes")
const photoRoutes = require("./PhotoRoutes")
const commentRoutes = require("./CommentRoutes")
const SocialMedia = require("./Socialmedia")

const { authentication } = require("../middlewares/auth")

router.use("/photos", authentication, photoRoutes)
router.use("/comments", authentication, commentRoutes)
router.use("/socialmedia", authentication, SocialMedia)
router.use("/users", userRoutes)

module.exports = router