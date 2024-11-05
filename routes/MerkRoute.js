import  express  from "express";
import{
  getMerk,
  getMerkById,
  getMerkByName,
  saveMerk,
  updatetMerk,
  deleteMerk
} from '../controllers/MerkController.js'



const router = express.Router();
router.get('/merk',getMerk);
router.get('/merk',getMerkByName);
router.get('/merk/:id',getMerkById);
router.post('/merk',saveMerk);
router.patch('/merk/:id',updatetMerk);
router.delete('/merk/:id',deleteMerk);


export default router;