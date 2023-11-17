const {
    User,
    SocialMedia,
} = require("../models")

class SocialMediaController{

    // bisa diakases siapa saja yang sudah login
    static async getAllSocialMedia (req, res) {
        try {
            const data = await SocialMedia.findAll({
                include: {
                    User,
                    SocialMedia
                }
            })

            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    // bisa diakses jika UserIdnya sama dengan yang login
    static async getSocialMediaById(req, res) {
        try {
            const { id } = req.params
            const socialMediaData = req.socialMediaData
            const data = await SocialMedia.findOne({
                where: {
                    id : id,
                    SocialMediaId: socialMediaData.id
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
    static async addSocialMedia (req, res) {
        try {
            const {
                name,
                social_media_url
            } = req.body

            const userData = req.userData
            console.log(userData, "<<userdata")

            const data = await SocialMedia.create({
                name,
                social_media_url,
                UserId: userData.id
            });

            res.status(201).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async updateSocialMedia (req, res) {
        try {
            const {
                name,
                social_media_url
            } = req.body

            const { id } = req.params

            const data = await SocialMedia.update({
                name,
                social_media_url
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
    static async deleteSocialMediaById(req, res) {
        try {
            const { id } = req.params
            const data = await SocialMedia.destroy({
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
            res.status(200).json("Your social medias has been succesfully deleted")

        } catch (error) {
            console.log(error)
            res.status(error.code || 500).json(error.message)
        }
    }
}
module.exports = SocialMediaController;