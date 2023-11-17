const router = require('express').Router()

const userRoutes = require("./UserRoutes")
const photoRoutes = require("./PhotoRoutes")
const commentRoutes = require("./CommentRoutes")
const SocialMedia = require("./Socialmedia")


router.use("/photos", photoRoutes)
router.use("/comments", commentRoutes)
router.use("/socialmedia", SocialMedia)
router.use("/users", userRoutes)

module.exports = router