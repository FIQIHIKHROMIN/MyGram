const router = require("express").Router()
const CommentController = require("../controllers/CommentController")
const { authentication, authorization } = require("../middlewares/auth")

router.get("/", CommentController.getAllComments)
router.get("/:id", CommentController.getCommentsById)
router.post("/", authentication, authorization, CommentController.addComments)
router.put("/:id", authentication, authorization, CommentController.updateCommet)
router.delete("/:id", authentication, authorization, CommentController.deleteCommentById)

module.exports = router;