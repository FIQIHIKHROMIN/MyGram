const router = require("express").Router()
const PhotoController = require("../controllers/PhotoController")
const { authentication, authorization } = require("../middlewares/auth")

router.get("/", authentication, PhotoController.getAllPhotos)
router.get("/:id", authentication, PhotoController.getPhotoById)
router.post("/", authentication, PhotoController.addPhoto)
router.put("/:id", authentication, authorization, PhotoController.updatePhoto)
router.delete("/:id", authentication, authorization, PhotoController.deletePhotoById)

module.exports = router;