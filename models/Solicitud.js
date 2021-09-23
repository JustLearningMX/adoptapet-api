// Solicitud.js
/** Clase que representa una solicitud de adopción */
// class Solicitud {
//     constructor(id, idMascota, fechaDeCreacion, idUsuarioAnunciante, idUsuarioSolicitante, estado) {
//       this.id = id;
//       this.idMascota = idMascota;
//       this.fechaDeCreacion = fechaDeCreacion;
//       this.idUsuarioAnunciante = idUsuarioAnunciante;
//       this.idUsuarioSolicitante = idUsuarioSolicitante;
//       this.estado = estado;
//     }
  
//   }
  
//   module.exports = Solicitud;  

const mongoose = require('mongoose');
const SolicitudSchema = new mongoose.Schema({
  //Recibe el esquema con todos los atributos
  idMascota: {type: mongoose.Schema.Types.ObjectId, ref: 'Mascotas', required: true},//Refencía al ID dado por mongoDB
  fechaDeCreacion: Date,
  idUsuarioAnunciante: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true},//Refencía al ID dado por mongoDB
  idUsuarioSolicitante: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true},//Refencía al ID dado por mongoDB
  estado: {type: String, enum:['Aceptada', 'Cancelada', 'Pendiente']}
}, {collection:"Solicitudes", timestamps: true});

//Para que los servicios no tengan acceso a todos los atributos
SolicitudSchema.methods.publicData = () =>{
  //Regresará lo siguientes atributos
  return {
    id: this.id,
    idMascota: this.idMascota,
    idUsuarioAnunciante: this.idUsuarioAnunciante,
    idUsuarioSolicitante: this.idUsuarioSolicitante,
    estado: this.estado
  }
}

//Asociamos el Modelo Usuario con el esquema Usuario
mongoose.model("Solicitud", SolicitudSchema);