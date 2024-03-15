const  express = require('express')

const routers = express.Router()

const {uuid} = require('uuidv4')

const {celebrate, Joi} = require('celebrate')

const senhaForteRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const bcrypt = require('bcryptjs')

const  database = require('../database/connection')

//const jwt = require('jsonwebtoken')

const tokenValidation = require('../middleware/tokenValidation')
routers.use(tokenValidation)

//const Token = require('../model/token')

const User = require('../model/user')

routers.post('/',  celebrate({ 

    body : Joi.object().keys({
        nome : Joi.string().max(40).required() ,
        email : Joi.string().max(60).required() ,
        senha : Joi.string().max(15).regex(senhaForteRegex).required()
    })
    
    }) , async function(request, response){


    try{

    const senhaCriptografada = await bcrypt.hash(request.body.senha, 8); 

    const newUser = new User( uuid(), 
            request.body.nome, 
            request.body.email,  
            senhaCriptografada, true)
    
    await database('users').insert(newUser)
    response.status(201).json(newUser)
    }
    catch(error){
        response.status(400).json({Error: `${error}`})
    }
})

routers.get('/', async function (request, response) {

    try{
    const users = await database('users').select('*')
    response.status(200).json(users)
    }
    catch(error){response.status(400).json({Error: `${error}`})}

})

routers.get('/:codigo', async function (request, response) {
    
    try{
    const {codigo} = request.params    
    const user = await database('users').where('codigo', codigo).first()

    if(!user) {
        return response.status(400).json(
            {error: 'Codigo ' + codigo + ' não encontrado' })
    }

    response.status(200).json(user)
    }
    catch(error){ 
    response.status(400).json({Error: `${error}` })
    }

})

module.exports = routers