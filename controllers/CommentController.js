const {
    User,
    Photo,
    Comment,
} = require("../models")

class CommentController{

    // bisa diakases siapa saja yang sudah login
    static async getAllComments (req, res) {
        try {
            const data = await Photo.findAll({
                include: {
                    User,
                    Photo,
                    Comment
                }
            })

            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    // bisa diakses jika UserIdnya sama dengan yang login
    static async getCommentsById(req, res) {
        try {
            const { id } = req.params
            const commentData = req.commentData
            const data = await Comment.findOne({
                where: {
                    id : id,
                    CommentId: commentData.id
                }
            })

            if(!data) {
                throw {
                    code: 404,
                    message: "Data not found!"
                }
            }

            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(error.code || 500).json(error.message)
        }
    }
    static async addComments (req, res) {
        try {
            const {
                comment
            } = req.body

            const userData = req.userData
            console.log(userData, "<<userdata");

            const photoData = req.photoData
            console.log(photoData, "<<userdata");

            const data = await Comment.create({

                UserId: userData.id,
                PhotoId: photoData.id,
                comment
            });
           
            res.status(201).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async updateCommet (req, res) {
        try {
            const {
                comment
            } = req.body

            const { id } = req.params

            const data = await Comment.update({
                comment
            }, {
                where: {
                    id : id
                },
                returning : true
            })

            if (!data[0]) {
                throw {
                    code: 404,
                    message: "Data not Found!"
                }
            }

            res.status(201).json(data)
        } catch (error) {
            console.log(error)
            res.status(error.code || 500).json(error.message)
        }
    }
    static async deleteCommentById(req, res) {
        try {
            const { id } = req.params
            const data = await Comment.destroy({
                where:{
                    id
                }
            })
            if (!data) {
                throw {
                    code: 404,
                    message: "Data not found!"
                }
            }
            res.status(200).json("Your Comment has been succesfully deleted")

        } catch (error) {
            console.log(error)
            res.status(error.code || 500).json(error.message)
        }
    }
}
module.exports = CommentController;