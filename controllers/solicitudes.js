const mongoose = require('mongoose');
const Solicitud = mongoose.model('Solicitud');

function crearSolicitud(req, res, next) {
    // Instanciaremos una nueva mascota utilizando la clase usuario
    //var mascota = new Mascota(req.body)
    //res.status(201).send(mascota)

    //SESION 6
    const solicitud = new Solicitud(req.body);
    //save guarda en la bd, then es cuando todo salió bien
    solicitud.save().then(mas => {
        res.status(200).send(mas) //Devuelve 200 y el nuevo registro
    }).catch(next); //Mongoose en encarga del error y que siga la ejecución del programa
}

function obtenerSolicitud(req, res, next) { //Todas las mascotas o una en específico
    
}

function modificarSolicitud(req, res, next) {
}

function eliminarSolicitud(req, res, next) {

}

function count2(req, res, next){
    let idMascota = req.params.idMascota;
    Solicitud.aggregate([
        {
            '$match': {
                'idMascota': idMascota
            }
        }, {
            '$match': {
                'estado': 'Pendiente'
            }
        }, {
            '$count': 'total'
        }
    ])
    .then(r=>{ res.status(200).send(r)})
    .catch(next)
}

// exportamos las funciones definidas
module.exports = {
    crearSolicitud,
    obtenerSolicitud,
    modificarSolicitud,
    eliminarSolicitud,
    count2
}