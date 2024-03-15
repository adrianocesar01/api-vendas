const  express = require('express')
const routers = express.Router()

const {uuid} = require('uuidv4')

const {celebrate, Joi} = require('celebrate')

const  database = require('../database/connection')

//const jwt = require('jsonwebtoken')

const tokenValidation = require('../middleware/tokenValidation')
routers.use(tokenValidation)

//const Token = require('../model/token')

const Categoria = require('../model/categoria')

routers.post('/',  celebrate({ 

    body : Joi.object().keys({
        nome : Joi.string().min(3).max(30).required() 

    })
    
    }) , async function(request, response){

    try{
    const novaCategoria = new Categoria(uuid(), request.body.nome)

    await database('categorias').insert(novaCategoria)
    response.status(201).json(novaCategoria)
    }
    catch(error){
        response.status(400).json({Error: ` erro POST na categoria ${error}`})
    }
})

routers.get('/', async function (request, response) {

    try{

    const categorias = await database('categorias').select('*')
    response.status(200).json(categorias)
    }
    catch(error){response.status(400).json({Error: `${error}`})}

})

routers.get('/:codigo', async function (request, response) {

    try{

    const {codigo} = request.params    
    const categoria = await database('categorias').where('codigo', codigo).first()

    if(!categoria) {
        return response.status(400).json(
            {Error: `Codigo  de categoria ${codigo} não encontrado.` })
    }

    response.status(200).json(categoria)
    }
    catch(error){ 
    response.status(400).json({Error: `${error}` })
    }
})

routers.delete('/:codigo', async function (request, response) {

    try{
    const {codigo} = request.params    
    const categoria = await database('categorias').where('codigo', codigo).first()

    if(!categoria) {
        return response.status(400).json(
            {error: 'Codigo ' + codigo + ' não encontrado' })
    }

    await database('categorias').where('codigo', codigo).delete()

    response.status(204).json(categoria)
    }
    catch(error){ 
    response.status(400).json({Error: `${error}` })
    }

})

routers.put('/:codigo' ,  celebrate({ 

    body : Joi.object().keys({
        nome : Joi.string().min(3).max(30).required() 

    })
    
    }) , async function (request, response) {
        
    try{
        
    const {codigo} = request.params    
    const categoria = await database('categorias').where('codigo', codigo).first()

    if(!categoria) {
        return response.status(400).json(
            {error: 'Codigo' + codigo + 'não encontrado' })
    }

    //const { nome } = request.body

    //const categoriaAlterada = {codigo, nome  }

    const categoriaAlterada =  new Categoria(

        request.body.codigo,
        request.body.nome, true)
 
    await database('categorias').update(categoriaAlterada).where('codigo', codigo)

    response.status(200).json({codigo, ... categoriaAlterada })
    }
    catch(error)
    { 
        response.status(400).json({Error: `${error}` })
    }
    
})

module.exports = routers