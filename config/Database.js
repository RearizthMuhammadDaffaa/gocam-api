import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();
const db = new Sequelize(process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
  host:process.env.DB_HOST,
  port:process.env.DB_PORT,
  dialect:'mysql',
  pool: {
    max: 5,  // jumlah koneksi maksimum dalam pool
    min: 0,
    idle: 10000, // waktu dalam milidetik sebelum koneksi diambil dari pool
  },
})
// const db = new Sequelize('rental_kamera','root','',{
//   host:'localhost',
//   dialect:'mysql'
// })

export default db;