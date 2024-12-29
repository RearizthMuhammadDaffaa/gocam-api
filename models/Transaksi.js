import { Sequelize } from "sequelize";

import db from '../config/Database.js';
import Kamera from "./KameraModels.js";
const {DataTypes} = Sequelize;

const Transaksi = db.define('transaksi',{
  name:DataTypes.STRING,
  noNik:DataTypes.INTEGER,
  startDate:DataTypes.STRING,
  endDate:DataTypes.STRING,
  hoursRent:DataTypes.STRING,
  kameraId:DataTypes.STRING,
  statusPengambilan: {
    type: DataTypes.ENUM("Belum Diambil", "Sudah Diambil"),
    defaultValue: "Belum Diambil", // Default status awal
  },
  stripePaymentId:DataTypes.STRING
},{
  freezeTableName:true
})








export default Transaksi;
// (async()=>{
//   await db.sync();
//   console.log("database  diperbarui");
  
// })();
