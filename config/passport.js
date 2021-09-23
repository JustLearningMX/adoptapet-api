//SESIÓN 8
//Configuraciones generales para passport

const passport = require('passport');

//Importamos la estrategia de autenticación a utilizar
const localStrategy = require('passport').Strategy;
//Importamos mongoose
const mongoose = require('mongoose');
//Importamos el modelo de usuario para identificar el usuario que está usando la aplicación
const Usuario = mongoose.model('Usuarios');

passport.use('local', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, next){
    Usuario.findOne({email: email})
    .then(function (user){
        if(!user || !user.validarPassword(password)){//No existe el usuario
            return next(null, false, {errors: {'Email o contraseña': 'incorrecta'}});
        }
        //Pero si existe
        return next(null, user)
    })
    .catch(next)
}))