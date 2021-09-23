//primero importamos biblioteca de express
const express = require('express');//Estructura para definir una API

//app es el objeto donde se configurará la API
const app = express();

//Importamos bodyparser para parsear json's
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Sesión 6. Configuración de la BD MongoDB y Mongoose.
const mongoose = require('mongoose');

//var isProduction = process.env.NODE_ENV === 'production';

//Nos conectamos
mongoose.connect(process.env.MONGODB_URI, // obtiene la url de conexión desde las variables de entorno
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
  );

  
//Activar opción de debuggeo para errores
mongoose.set("debug", true);

//Importamos los esquemas que utilizaremos
require('./models/Usuarios');
require('./models/Mascota');
require('./models/Solicitud');

//SESIÓN 8 ( Importamos lo configrado en passport)
require('./config/passport');

//Sesion 3. Rutas
app.use('/v1', require('./routes'));

//Empezamos a llenar la app, como se deberá comportar
//Se pone a escuchar a la aplicación con el puerto, esperando las peticiones HTTP
app.listen(process.env.PORT, function () {
    console.log(`Server listening on port ${process.env.PORT}`);
});

/**CÓDIGO DE LA SESIÓN 3 NUEVA!!*/

//Primero modularizamos: modelos (clases)

/**CÓDIGO DE LA SESIÓN 2*/
/*EJEMPLO1:
 const gods = [
    {name: 'Zeus'},
    {name: 'Poseidon'},
    {name: 'Hades'}
]; */

//Ejemplo2:
/* const gods = { 
    Zeus: { live: 'Olympus', symbol: 'Thunderbolt' }, 
    Hades : { live : 'Underworld', symbol: 'Cornucopia' },
    Poseidon : { live : 'Sea', symbol: 'Trident' }
  };

//Criterios: 1. Intención (GET en este caso), 2. Petición HTTP
//Recibe la subdirección ''gods, es decir, se concentrará en esa subdirección
app.get('/gods', (req, res)=>{//solicitud del usuario y respuesta al usuario
    res.send(gods);//Función SEND viene de express
});

//Definimos un nuevo método GET para el ejemplo2
app.get('/gods/:name', (req, res) =>{
    let name = req.params.name;//Recibe del cliente
    let god = gods[name];//Busca y guarda
    if(god){
        res.send(god);
    }else{
        res.status(404).send("No se encontró el dato");
    }    
}); */

//Inicio del Reto1
/* const constelations = {
    "Andromeda" : {
        abreviatura: 'And',
        superficie: 722.3,
        num_estrellas: 152,
        estr_mas_brillante: 'Alpheratz'
    },
    "Via Lactea" : {
        abreviatura: 'Via',
        superficie: 345.6,
        num_estrellas: 87,
        estr_mas_brillante: 'Sol'
    },
    "Osa Mayor" : {
        abreviatura: 'OsaM',
        superficie: 590,
        num_estrellas: 543,
        estr_mas_brillante: 'Aldebarán'
    },
    "Osa Menor" : {
        abreviatura: 'OsaMen',
        superficie: 214,
        num_estrellas: 453,
        estr_mas_brillante: 'Beteljus'
    }
};

app.get('/const', (req, res)=>{//solicitud del usuario y respuesta al usuario
    res.send(constelations);//Función SEND viene de express
}) */
//Fin del reto 1

//INICIO DEL RETO 2**¡¡¡TERMINADO PERO FALTA CHECAR SI ERA ASÍ!!!***
/* app.get('/const/:name/:abreviatura', (req, res) =>{
    let name = req.params.name;//Recibe del cliente
    let abrev = req.params.abreviatura;//Recibe del cliente
    let constel;

    for (const key in constelations) {
        if (key === name && constelations[key]["abreviatura"]===abrev) {
            constel = constelations[name];//Busca y guarda
        }        
    }    
    if(constel){
        res.send(constel);
    }else{
        res.status(404).send("No se encontró el dato");
    }    
}); */
//FIN DEL RETO 2

//EJEMPLO 3
/* app.put('/gods/:name', (req, res)=>{//Modificar un dios
    let god = req.params.name;
    gods[god] = req.body;//que se traiga el body y lo guarde en el objeto
    res.send(gods);
});

app.post('/gods', (req, res)=>{//Se agrega Nuevo dios
    let name = req.query.name;//Obtenemos el nombre del nuevo dios
    let info = req.body;//El body que mandó el usuario
    gods[name] = info;//Lo agregamos al objeto
    res.status(200).send(gods);
});

app.delete('/gods/:name', (req, res)=>{
    let name = req.params.name;
    delete gods[name];
    res.send(gods);
}); */