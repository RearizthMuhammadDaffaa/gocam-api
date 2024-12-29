import { Sequelize } from "sequelize";

import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const Merk = db.define('merk',{
  name:DataTypes.STRING,
  images:DataTypes.STRING,
  url:DataTypes.STRING,
},{
  freezeTableName:true
})






export default Merk;
// (async()=>{
//   await db.sync();
// })();
