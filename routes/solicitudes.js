const router = require('express').Router();

const {
    crearSolicitud,
    obtenerSolicitud,
    modificarSolicitud,
    eliminarSolicitud,
    count2
} = require('../controllers/mascota');

router.get('/', obtenerSolicitud);
router.get('/count2/:sol', count2);
router.get('/:id', obtenerSolicitud);

router.post('/', crearSolicitud);
router.put('/:id', modificarSolicitud);
router.delete('/:id', eliminarSolicitud);

module.exports = router;