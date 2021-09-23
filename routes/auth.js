//Sesión 8. Configuración de ruta para autenticación

const jwt = require('express-jwt');
const secret = require('../config').secret;

//En un header se mandan imformación de configuración, 
//en este caso el token de configuración de los usuarios
function getTokenFromHeader(req){//SPLIT genera un arreglo a partir de una cadena
    if(req.headers.authorization && (req.headers.authorization.split(' ')[0] === 'Token' || req.headers.authorization.split('')[0] === 'Bearer')){
        return req.headers.authorization.split(' ')[1]
    }
    return null;
}

//Construimos un JSON de autenticación (servicio)
const auth = {
    //Separamos el servicio en dos
    requerido: jwt({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'usuario',
        getToken: getTokenFromHeader
    }),
    opcional: jwt({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'usuario',
        credentialsRequired: false,
        getToken: getTokenFromHeader
    })
}

module.exports = auth;