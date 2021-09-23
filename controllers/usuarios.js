/*  Archivo controllers/usuarios.js
 *  Simulando la respuesta de objetos Usuario
 *  en un futuro aquí se utilizarán los modelos
 */

// importamos el modelo de usuarios
//const Usuario = require('../models/Usuarios')

//SESION 6 CONSTANTE
const mongoose = require('mongoose');
const { serializeUser } = require('passport');
const Usuario = mongoose.model('Usuarios');

//SESION 8 cargar passport
const passport = require('passport');

function crearUsuario(req, res, next) {
  //Sesion 8
  const body = req.body,
    password = body.password;//guardamos el pass

  delete body.password//Borramos pass texto plano

  //SESION 6
  const usuario = new Usuario(body);

  //Sesion 8
  usuario.crearPassword(passowrd);

  //save guarda en la bd, then es cuando todo salió bien
  usuario.save()
  .then(mas => {
    return res.status(200).json(usuario.toAuthJSON()) //Devuelve 200 y el nuevo registro
  })
  .catch(next); //Mongoose en encarga del error y que siga la ejecución del programa
}

function obtenerUsuarios(req, res, next) {
 /*  if (req.params.id) {//Si solo pasan el ID
    Usuario.findById(req.usuario.id)
      .then(uno => { res.send(uno) })
      .catch(next)
  } else { //Se pide toda la lista de mascotas
    Usuario.find()
      .then(todos => { res.send(todos) })
      .catch(next)
  } */

  //SESION 8
  Usuario.findById(req.usuario.id, (err, user) => {
    if (!user || err) {
      return res.sendStatus(401)
    }
    return res.json(user.publicData());
  }).catch(next);
}

function modificarUsuario(req, res, next) {
  console.log(req.usuario)
  Usuario.findById(req.usuario.id).then(user => {
    if (!user) { return res.sendStatus(401); }
    let nuevaInfo = req.body
    if (typeof nuevaInfo.username !== 'undefined')
      user.username = nuevaInfo.username
    if (typeof nuevaInfo.bio !== 'undefined')
      user.bio = nuevaInfo.bio
    if (typeof nuevaInfo.foto !== 'undefined')
      user.foto = nuevaInfo.foto
    if (typeof nuevaInfo.ubicacion !== 'undefined')
      user.ubicacion = nuevaInfo.ubicacion
    if (typeof nuevaInfo.telefono !== 'undefined')
      user.telefono = nuevaInfo.telefono
    if (typeof nuevaInfo.password !== 'undefined')
      user.crearPassword(nuevaInfo.password)
    user.save().then(updatedUser => {  
      res.status(201).json(updatedUser.publicData())
    }).catch(next)
  }).catch(next)
}

function eliminarUsuario(req, res, next) {
  // únicamente borra a su propio usuario obteniendo el id del token
  Usuario.findOneAndDelete({ _id: req.usuario.id })
  .then(r => {//Buscando y eliminando usuario en MongoDB.
    res.status(200).send(`Usuario ${req.params.id} eliminado: ${r}`);
  })
  .catch(next);
}

function iniciarSesion(req, res, next) {
  if (!req.body.email) {
    return res.status(422).json({ errors: { email: "no puede estar vacío" } });
  }

  if (!req.body.password) {
    return res.status(422).json({ errors: { password: "no puede estar vacío" } });
  }

  passport.authenticate('local', { session: false }, function (err, user, info) {
    if (err) { return next(err); }

    if (user) {
      user.token = user.generarJWT();
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
}

// exportamos las funciones definidas
module.exports = {
  crearUsuario,
  obtenerUsuarios,
  modificarUsuario,
  eliminarUsuario,
  iniciarSesion
}
