/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/


const {Router} = require('express')
const router = Router()
const {check} = require('express-validator')

const {createUser, loginUser, renewToken} = require('../controllers/auth')
const {validarCampos} = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

router.post(
    '/new',
    [ //middleware
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'la longitud del password debe ser de 6 caracteres minimo').isLength({min: 6}),
        validarCampos
    ],
    createUser
)

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'la longitud del password debe ser de 6 caracteres minimo').isLength({min: 6}),
        validarCampos
    ],
    loginUser)

router.get('/renew',validarJWT,renewToken)


module.exports = router
