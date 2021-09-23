// Mascota.js
/** Clase que representa un animalito a adoptar */
// class Mascota {
//     constructor(id, nombre, categoria, fotos, descripcion, anunciante, ubicacion) {
//       this.id = id;
//       this.nombre = nombre; // nombre de la mascota (o titulo del anuncio)
//       this.categoria = categoria; // perro | gato | otro
//       this.fotos = fotos; // links a las fotografías
//       this.descripcion = descripcion; // descripción del anuncio
//       this.anunciante = anunciante; // contacto con la persona que anuncia al animalito
//       this.ubicacion = ubicacion; // muy importante
//     }  
//   }
  //Le decimos a nuestro archivo JS que queremos exportar de él a otros archivos
  //module.exports = Mascota;//Exportaremos la definición completa de la clase Mascota
  
  //LO COMENTAMOS PARA APLICAR ESQUEMAS SESIÓN 6*/
  
  const mongoose = require('mongoose');
  const MascotaSchema = new mongoose.Schema({
    //Recibe el esquema con todos los atributos
    nombre: {type: String, required: true}, //Atributo requerido
    categoria: {type: String, enum: ['Perro', 'Gato', 'Otro']}, //solo tres opciones
    fotos: String,
    descripcion: {type: String, required: true}, //Atributo requerido,
    anunciante: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios'},//Refencía al ID dado por mongoDB
    ubicacion: String
  }, {collection:"Mascotas", timestamps: true});

  //Para que los servicios no tengan acceso a todos los atributos
  MascotaSchema.methods.publicData = () =>{
    //Regresará lo siguientes atributos
    return {
      id: this.id,
      nombre: this.nombre,
      categoria: this.categoria,
      fotos: this.fotos,
      descripcion: this.descripcion,
      anunciante: this.anunciante,
      ubicacion: this.ubicacion
    };
  };

  //Asociamos el Modelo Usuario con el esquema Usuario
  mongoose.model("Mascota", MascotaSchema);