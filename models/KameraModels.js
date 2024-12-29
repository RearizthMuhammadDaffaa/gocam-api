import { Sequelize } from "sequelize";

import db from '../config/Database.js';
import Transaksi from "./Transaksi.js";

const {DataTypes} = Sequelize;

const Kamera = db.define('kamera',{
  name:DataTypes.STRING,
  images:DataTypes.STRING,
  url:DataTypes.STRING,
  cinemacam:DataTypes.STRING,
  lens:DataTypes.STRING,
  battery:DataTypes.STRING,
  merk:DataTypes.STRING,
  hoursPrice:DataTypes.INTEGER,
  daysPrice:DataTypes.INTEGER
},{
  freezeTableName:true
})








export default Kamera;

// (async()=>{
//   await db.sync();
// })();