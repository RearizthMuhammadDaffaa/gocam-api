import express from "express";
import fileUpload from "express-fileupload";
import cors from 'cors';
import cookieParser from "cookie-parser";
import KameraRoute from './routes/KameraRoute.js';
import MerkRoute from './routes/MerkRoute.js';
import TransaksiRoute from './routes/TransaksiRoute.js';
import AuthRoute from './routes/AuthRoute.js';
import UserRoute from './routes/UserRoute.js';

const app = express();

app.listen();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://gocam.vercel.app'
  ],  // Sesuaikan dengan URL React app
  credentials: true  // Izinkan cookie untuk dikirim
}));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static("public"));
app.use(KameraRoute);
app.use(MerkRoute);
app.use(TransaksiRoute);
app.use(AuthRoute);
app.use(UserRoute);


app.listen(5000,()=>console.log("Server Running"));

