const {
    verifyToken
} = require("../utils/jwt")

const {
    User
} = require("../models")

const authentication = async(req, res, next) => {
    try {
        //check header, ada token atau tidak

        const token = req.headers["authorization"]

        if(!token) {
            throw {
                code: 401,
                message : "Token not provided!"
            }
        }

        // verivy token
        const decode = verifyToken(token)

        const userData = await User.findOne({
            where:{
                id: decode.id,
                email: decode.email
            }
        })

        if(!userData) {
            throw {
                code: 401,
                message: "User not found!"
            }
        }

        req.userData = {
            id: userData.id,
            full_name: userData.full_name,
            email: userData.email,
            username: userData.username,
            profile_image_url: userData.profile_image_url,
            age: userData.age,
            phone_number: userData.phone_number
        }

        next()
    } catch (error) {
        res.status(error.code || 500).json(error.message)
    }
}

const authorization = async (req, res, next) => {
    try {
      // Dapatkan data pengguna dari middleware autentikasi
      const { userData } = req;
      console.log(userData, "<<userdata")
      
      // Dapatkan parameter yang diperlukan dari request
      const { id } = req.params;
      console.log(id, "<<id")
  
      // Cek apakah pengguna yang sedang login adalah pemilik data yang akan diupdate
      if (userData.id != id) {
        throw {
          code: 403,
          message: 'Unauthorized update: User can only update their own data',
        };
      }
  
      // Lanjutkan ke controller jika otorisasi berhasil
      next();
    } catch (error) {
      res.status(error.code || 500).json(error.message);
    }
  };
  
  module.exports = {
    authentication,
    authorization,
  };