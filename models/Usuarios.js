// Usuario.js
/** Clase que representa a un usuario de la plataforma*/
/* class Usuario {
    constructor(id, username, nombre, apellido, email, password, tipo) {
      this.id = id;
      this.username = username;
      this.nombre = nombre;
      this.apellido = apellido;
      this.email = email;
      this.password = password;
      this.tipo = tipo; // tipo normal o anunciante
    }
  }
  module.exports = Usuario; LO COMENTAMOS PARA APLICAR ESQUEMAS SESIÓN 6*/

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

const UsuarioSchema = new mongoose.Schema({
  //Recibe el esquema con todos los atributos
  username: {
    type: String,
    unique: true,
    required: [true, "Campo USERNAME no puede ir vacío"],
    lowercase: true,
    //match: 
    index: true
  },
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, "Falta email"],
    unique: true,
    match: [/\S+@\S+.\S+/, "Email inválido"],
    index: true
  },
  //password: String, se quita SESION 7
  tipo: {
    type: String,
    enum: ['Normal', 'Anunciante']
  },
  //PARA EL PROCESO DE CIFRADO
  hash: String,
  salt: String
}, { collection: "Usuarios", timestamps: true });

UsuarioSchema.plugin(uniqueValidator, {message: "Ya existe"});

//Para que los servicios no tengan acceso a todos los atributos
UsuarioSchema.methods.publicData = function() {
  //Regresará lo siguientes atributos
  return {
    id: this.id,
    username: this.username,
    nombre: this.nombre,
    apellido: this.apellido,
    email: this.email,
    tipo: this.tipo
  };
};

UsuarioSchema.methods.crearPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
  .toString("hex");
}

UsuarioSchema.methods.validarPassword = function(password){
  const newHash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
  .toString('hex');
  return this.hash === newHash;
}

//Generar el token de autenticación
UsuarioSchema.methods.generaJWT = function(){
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60); //Expira en 60 días
  
  return jwt.sign({
    id: this._id,
    uername: this.username,
    exp: parseInt(exp.getTime()/1000),
  }, secret)
}

UsuarioSchema.methods.toAuthJSON = function(){
  return {
    username: this.username,
    email: this.email,
    token: this.generaJWT()
  }
}

//Asociamos el Modelo Usuario con el esquema Usuario
mongoose.model("Usuarios", UsuarioSchema);