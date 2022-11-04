const {Router} = require ('express');
const { check } = require('express-validator');
const { usuario, 
        usuarioGet,
        usuarioPost,
        usuarioPut,
        usuarioPatch,
        usuarioDelete} = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/hola', usuario);

router.get('/', usuarioGet);

router.post('/', [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password','El password dene ser mas de 6 caracteres').isLength({min:6}),
        check('correo','El correo no es valido').isEmail(),
        check('correo').custom( emailExiste),
        //FORMA 1: check('rol','No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        // FORMA 2: check('rol').custom( (rol) => esRoleValido(rol)),
        // FORMA 3 es una forma reducida de la FORMA 2:
        check('rol').custom( esRoleValido),
        validarCampos ],
        usuarioPost);

router.put('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom( esRoleValido),
        validarCampos ], 
        usuarioPut);

router.patch('/', usuarioPatch);

router.delete('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos ],
        usuarioDelete);


module.exports = router;