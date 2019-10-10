const express = require('express')
const app = express()

//rotas
const index = require('./routes/index')
const alunas = require('./routes/alunasRoute')

app.all('*', function(req, res, next) {
    console.log("Passamos pelo app, uhuu!!")
    next()
})

app.use('/', index)
app.use('/alunas', alunas)

module.exports = app
