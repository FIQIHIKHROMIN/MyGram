const router = require("express").Router()
const SocialMediaController = require("../controllers/SocialMediaController")
const { authentication, authorization } = require("../middlewares/auth")

router.get("/", authentication, authorization, SocialMediaController.getAllSocialMedia)
router.get("/:id", authentication, authorization, SocialMediaController.getSocialMediaById)
router.post("/", authentication, authorization, SocialMediaController.addSocialMedia)
router.put("/:id", authentication, authorization, SocialMediaController.updateSocialMedia)
router.delete("/:id", SocialMediaController.deleteSocialMediaById)

module.exports = router;