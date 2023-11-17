const router = require("express").Router()
const CommentController = require("../controllers/CommentController")

router.get("/", CommentController.getAllComments)
router.get("/:id", CommentController.getCommentsById)
router.post("/", CommentController.addComments)
router.put("/:id", CommentController.updateCommet)
router.delete("/:id", CommentController.deleteCommentById)

module.exports = router;