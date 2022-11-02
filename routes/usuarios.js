const {Router} = require ('express');
const { usuario, 
        usuarioGet,
        usuarioPost,
        usuarioPut,
        usuarioPatch,
        usuarioDelete} = require('../controllers/usuarios');
        
const router = Router();

router.get('/hola', usuario);

router.get('/', usuarioGet);

router.post('/', usuarioPost);

router.put('/:id', usuarioPut);

router.patch('/', usuarioPatch);

router.delete('/',usuarioDelete);


module.exports = router;