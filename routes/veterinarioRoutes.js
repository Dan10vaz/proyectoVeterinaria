import express from 'express';
const router = express.Router();
import { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword} from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';


//Rutas para el area publica no se requiere cuenta para entrar
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);

//Rupas para el area privada 
router.get('/perfil', checkAuth, perfil);


export default router;