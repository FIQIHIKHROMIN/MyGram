const {
    User,
    Photo,
    Comment,
    SocialMedia,
} = require("../models")

const {
    generateToken
} = require("../utils/jwt")

const {
    comparePassword
} = require("../utils/bcrypt")

class UserController  {
    static async getUsers(req, res) {
        try {
            const data = await User.findAll({
                include : 
                    Photo,
                    Comment,
                    SocialMedia
                
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async register(req, res) {
        try {
            const {
                full_name,
                email,
                username,
                password,
                profile_image_url,
                age,
                phone_number
            } = req.body

            const data = await User.create({
                full_name,
                email,
                username,
                password,
                profile_image_url,
                age,
                phone_number
            })

            res.status(201).json({
                id: data.id,
                username: data.username,
                email: data.email,
                profile_image_url: data.profile_image_url,
                age: data.age,
                phone_number:data.phone_number
            })
        } catch (error) {

            console.log(error)
            res.status(500).json(error)
        }
    }

    static async login(req, res) {
        try {
            const {
                email,
                password
            } = req.body

            //find didatabase
            const data = await User.findOne({
                where: {
                    email:email
                }
            })
            if (!data) {
                throw {
                    code: 404,
                    message: " User not registed!"
                }
            }
            //compare password
            const isValid = comparePassword(password, data.password)

            if(!isValid) {
                throw {
                    code: 401,
                    message: "Incorrect password!"
                }
            }

            //generate token
            const token = generateToken({
                id: data.id,
                email: data.email,
                username: data.username
            })

            res.status(200).json({
                token
            })
            console.log(token)
        } catch (error) {
            res.status(error.code || 500).json(error)
            
        }
    }

    static async updateUser (req, res) {
        try {
            const {
                full_name,
                email,
                username,
                profile_image_url,
                age,
                phone_number
            } = req.body

            const { id } = req.params

            const data = await User.update({
                full_name,
                email,
                username,
                profile_image_url,
                age,
                phone_number
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
    static async deleteUserById(req, res) {
        try {
            const { id } = req.params
            const data = await User.destroy({
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
            res.status(200).json("Your Users has been succesfully deleted")

        } catch (error) {
            console.log(error)
            res.status(error.code || 500).json(error.message)
        }
    }
}

module.exports = UserController