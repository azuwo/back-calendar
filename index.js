const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config()
const cors = require('cors')

//crear servidor express
const app = express()

//Base de Datos
dbConnection()

// CORS
app.use(cors())

//Directorio Publico
app.use(express.static('public'))

// Lectura y parseo del body
app.use( express.json())


//Rutas
    //auth // crear, login, renew
    app.use('/api/auth', require('./routes/auth'))
//TODO: CRUD: eventos
    app.use('/api/events', require('./routes/events'))


//Escuchar peticiones

app.listen(process.env.PORT,()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})