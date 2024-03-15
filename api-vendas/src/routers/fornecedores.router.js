const  express = require('express')
const routers = express.Router()

const {uuid} = require('uuidv4')

const {celebrate, Joi} = require('celebrate')

const  database = require('../database/connection')

//const jwt = require('jsonwebtoken')

const tokenValidation = require('../middleware/tokenValidation')
routers.use(tokenValidation)

//const Token = require('../model/token')

const Fornecedor = require('../model/fornecedor')

routers.post('/',  celebrate({ 

    body : Joi.object().keys({
        nome : Joi.string().min(3).max(30).required() ,
        email : Joi.string().min(13).max(30).required(), 
        telefone : Joi.string().min(11).max(20).required()

    })
    
    }) , async function(request, response){

    try{

    const novoFornecedor = new Fornecedor(uuid(), 
    request.body.nome, 
    request.body.email, 
    request.body.telefone, true)

    await database('fornecedores').insert(novoFornecedor) 
    response.status(201).json(novoFornecedor) 
    }
    catch(error){
       response.status(400).json({Error: `erro POST no fornecedor: ${error}`})
    }
})

routers.get('/', async function (request, response) {

    try{

    const fornecedores = await database('fornecedores').select('*')
    response.status(200).json(fornecedores)
    }
    catch(error){response.status(400).json({Error: `${error}`})}
    
})

routers.get('/:codigo', async function (request, response) {

    try{
    const {codigo} = request.params    
    const fornecedor = await database('fornecedores').where('codigo', codigo).first()

    if(!fornecedor) {
        return response.status(400).json(
            {error: `Codigo ${codigo} não encontrado`})
    }

    response.status(200).json(fornecedor)
    }
    catch(error){
       response.status(400).json({Error: `mensagem de erro: ${error}`})
    }

})

routers.delete('/:codigo', async function (request, response) {

    try{
    const {codigo} = request.params    
    const fornecedor = await database('fornecedores').where('codigo', codigo).first()

    if(!fornecedor) {
        return response.status(400).json(
            {error: 'Codigo' + codigo + 'não encontrado' })
    }

    await database('fornecedores').where('codigo', codigo).delete()

    response.status(204).json()

    }
    catch(error){
       response.status(400).json({Error: `${error}`})
    }
})

routers.put('/:codigo' ,  celebrate({ 

    body : Joi.object().keys({
        nome : Joi.string().min(3).max(30).required() ,
        email : Joi.string().min(13).max(30).required(), 
        telefone : Joi.string().min(11).max(20).required()

    })
    
    }) , async function (request, response) {

    try{
    const {codigo} = request.params    
    const fornecedor = await database('fornecedores').where('codigo', codigo).first()

    if(!fornecedor) {
        return response.status(400).json(
            {error: 'Codigo ' + codigo + ' não encontrado' })
    }

    //const { nome, email, telefone } = request.body

    //const fornecedorAlterado = {
    //    codigo,
    //    nome,
    //    email, 
    //    telefone
    //}

    const fornecedorAlterado = new Fornecedor(
    
    request.body.codigo, 
    request.body.nome, 
    request.body.email, 
    request.body.telefone, true)
    
 
    await database('fornecedores').update(fornecedorAlterado).where('codigo', codigo)

    response.status(200).json({codigo, ... fornecedorAlterado })

    }
    catch(error){
       response.status(400).json({Error: `${error}`})
    }
})

module.exports = routers