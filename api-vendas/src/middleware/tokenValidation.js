const jwt = require('jsonwebtoken')

function tokenValidation(request, response, next){

    try{
    
    var tokenEnviado = request.headers.authorization 
    tokenEnviado = tokenEnviado.split(' ')[1]

    if(!tokenEnviado){response.status(401).json({mensagem: 'token não informado'})}
    
    jwt.verify(tokenEnviado, 'f00e3988be467fb110dab97ed642487f')
       
    }
    catch(error){response.status(401).json({mensagem: 'token inválido!'})}

    return next()

}

module.exports = tokenValidation