import  express  from "express";
import{
  getTransaksi,
  getTransaksiById,
  getTransaksiByName,
  saveTransaksi,
  updatetTransaksi,
  deleteTransaksi,
  getTransaksiWithKamera
} from '../controllers/TransaksiController.js'



const router = express.Router();
router.get('/transaksi',getTransaksi);
router.get('/transaksi',getTransaksiByName);
router.get('/transaksi/:id',getTransaksiById);
router.post('/transaksi',saveTransaksi);
router.patch('/transaksi/:id',updatetTransaksi);
router.delete('/transaksi/:id',deleteTransaksi);
router.get('/transaksi-kamera',getTransaksiWithKamera);


export default router;