import { Sequelize } from "sequelize";

import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const Transaksi = db.define('transaksi',{
  name:DataTypes.STRING,
  noNik:DataTypes.INTEGER,
  startDate:DataTypes.STRING,
  endDate:DataTypes.STRING,
  hoursRent:DataTypes.STRING,
},{
  freezeTableName:true
})






export default Transaksi;
(async()=>{
  await db.sync();
})();
