const express = require('express')
const routers = express.Router()
const bcrypt = require('bcryptjs')
const {celebrate, Joi} = require('celebrate')

const jwt = require('jsonwebtoken') 

const database = require('../database/connection')

routers.post('/', celebrate({body: Joi.object().keys({
                            email: Joi.string().email().required(), 
                            senha: Joi.string().required()

})}), async function(request, response){

    try{

        const {email, senha} = request.body
        const user = await database("users").where('email', email).first()

        if(!user) 
            {response.status(401).json({mensagem: 'Usuário não cadastrado.'})}

            const senhaValida = await bcrypt.compare(senha, user.senha)

                if(!senhaValida){response.status(401).json
                    ({mensagem: 'Senha inválida!'})

            }

            // gerando o token 

            const token = jwt.sign({

                codigo: user.codigo, 
                nome: user.nome, 
                email: user.email}, 
                'f00e3988be467fb110dab97ed642487f', 
                {expiresIn: 8000})
                
            response.status(200).json(token)
    }

    catch(error){
        response.status(400).json({Error: `erro POST em sessions: ${error}`})
    }
})

module.exports = routers