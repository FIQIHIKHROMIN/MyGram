const router = require("express").Router()
const SocialMediaController = require("../controllers/SocialMediaController")

router.get("/", SocialMediaController.getAllSocialMedia)
router.get("/:id", SocialMediaController.getSocialMediaById)
router.post("/", SocialMediaController.addSocialMedia)
router.put("/:id", SocialMediaController.updateSocialMedia)
router.delete("/:id", SocialMediaController.deleteSocialMediaById)

module.exports = router;