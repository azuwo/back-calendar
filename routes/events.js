const {Router} = require('express')
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')
const {validarJWT} = require('../middlewares/validar-jwt')
const {getEvents,createEvents,updateEvents,deleteEvents} = require('../controllers/events')
const {isDate} = require('../helpers/isDate')

const router = Router()

//todas las peticiones deben pasar por los siguentes middleware
router.use(validarJWT)

//Obtener eventos
router.get('/',getEvents)

//Crear eventos
router.post(
    '/',
    [
        check('title', 'Title is mandatory').not().isEmpty(),
        check('start', 'Start Date is mandatory').not().isEmpty(),
        check('start', 'Start Date must be valid').custom(isDate),
        check('end', 'End Date is mandatory').not().isEmpty(),
        check('end', 'End Date must be valid').custom(isDate),
        validarCampos
    ],
    createEvents)

//Actualizar eventos
router.put('/:id',updateEvents)

//Eliminar eventos
router.delete('/:id',deleteEvents)


module.exports = router