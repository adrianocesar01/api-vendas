const express = require('express')  
const app = express()

const routers = require('./routers/main.router')

const {errors} = require('celebrate')

app.use(express.json())
app.use(routers)
app.use(errors())

app.listen(8000, () => { 
    console.log("api-vendas em execução na porta 8000...") 
})