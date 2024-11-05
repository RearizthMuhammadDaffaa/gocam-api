
import bcrypt from "bcryptjs"
import {Sequelize} from "sequelize";
const {DataTypes} = Sequelize;
import db from "../config/Database.js";

const User = db.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin','superadmin'),  // Multi-role: bisa ditambah dengan role lain seperti 'moderator', dll.
    defaultValue: 'user',
  },
  lastLogin: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
  },
  resetPasswordExpiresAt: {
    type: DataTypes.DATE,
  },
  verificationToken: {
    type: DataTypes.STRING,
  },
  verificationTokenExpiresAt: {
    type: DataTypes.DATE,
  },
}, {
  freezeTableName:true,
  timestamps: true,
});



export default User;

(async()=>{
  await db.sync();
})()