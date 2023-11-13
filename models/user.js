'use strict';
const {
  Model
} = require('sequelize');

const {
  hashPassword
} = require('../utils/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Photo, { foreignKey: "UserId"})
    }
  }
  User.init({
    full_name: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      //data unik
      allowNull: false,
      unique: true,
      validate:{

        //email
        isEmail: {
          args: true,
          msg: 'Format email tidak valid'
        },

        //tidak boleh kosong
        notEmpty:{
          args: true,
          msg: "Required"
        },
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          args: true,
          msg: "Required"
        },
        //allowNull: false
      }
    },
    password: DataTypes.STRING,
    profile_image_url: DataTypes.TEXT,
    age: DataTypes.INTEGER,
    phone_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        const hashedPassword = hashPassword(user.password)

        user.password = hashedPassword
      }
    }
  });
  return User;
};