//SESIÓN 8
//Configuraciones generales de la aplicación
module.exports = {
    secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret'
};