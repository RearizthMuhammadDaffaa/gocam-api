import  express  from "express";
import {
  getKamera,
  getKameraById,
  saveKamera,
  updatetKamera,
  deleteKamera,
  getKameraByName,
  countByMerk,
  getKameraByMerk
} from '../controllers/KameraController.js';




const router = express.Router();

router.get('/kamera',getKamera);
router.get('/kamera/search',getKameraByName);
router.get('/kamera/sort',getKameraByMerk);
router.get('/kamera/count',countByMerk);
router.get('/kamera/:id',getKameraById);
router.post('/kamera',saveKamera);
router.patch('/kamera/:id',updatetKamera);
router.delete('/kamera/:id',deleteKamera);

export default router;