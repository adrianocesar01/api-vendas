const express =  require('express')
const routers = express.Router()

const produtosRouter = require('./produtos.router')
const categoriasRouter = require('./categorias.router')
const fornecedoresRouter = require('./fornecedores.router')
const usersRouter = require('./users.router')
const sessionsRouter = require('./sessions.router')

//const jwt = require('jsonwebtoken')
//const Token = require('../model/token')
//const tokenValidationRouter = require(Token)
//routers.use(Token, tokenValidationRouter )

routers.use('/produtos', produtosRouter)
routers.use('/categorias', categoriasRouter)
routers.use('/fornecedores', fornecedoresRouter)
routers.use('/users', usersRouter)
routers.use('/sessions', sessionsRouter)

module.exports = routers