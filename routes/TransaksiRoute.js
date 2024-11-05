import  express  from "express";
import{
  getTransaksi,
  getTransaksiById,
  getTransaksiByName,
  saveTransaksi,
  updatetTransaksi,
  deleteTransaksi,
} from '../controllers/TransaksiController.js'



const router = express.Router();
router.get('/transaksi',getTransaksi);
router.get('/transaksi',getTransaksiByName);
router.get('/transaksi/:id',getTransaksiById);
router.post('/transaksi',saveTransaksi);
router.patch('/transaksi/:id',updatetTransaksi);
router.delete('/transaksi/:id',deleteTransaksi);


export default router;