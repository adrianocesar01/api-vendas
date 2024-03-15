const  express = require('express')

const routers = express.Router()

const {uuid} = require('uuidv4')

const {celebrate, Joi} = require('celebrate')

const  database = require('../database/connection')

//const jwt = require('jsonwebtoken')

const tokenValidation = require('../middleware/tokenValidation')
routers.use(tokenValidation)

//const Token = require('../model/token')

const Produto = require('../model/produto')

routers.post('/',  celebrate({ 

    body : Joi.object().keys({ 
        nome : Joi.string().min(3).max(30).required(), 
        codigoCategoria : Joi.string().min(36).max(36).required(), 
        codigoFornecedor : Joi.string().min(36).max(36).required(), 
        valor : Joi.number().min(0).required(), 
    })
    
    }) , async function(request, response){

    try{
        const produto = new Produto(uuid(), 
        request.body.nome, 
        request.body.codigoCategoria, 
        request.body.codigoFornecedor, 
        request.body.valor, 
        request.body.ativo) // = 1)
     
        await database('produtos').insert(produto)
        response.status(201).json(produto)
    }

    catch(error){
        response.status(400).json({Error: `${error}`})
    }
})

routers.get('/', async function (request, response) {

        const produtos = 'produtos'
        const categorias = 'categorias' 
        const fornecedores = 'fornecedores' 

        try{
            const retornoCompleto = await database('produtos')
                    .join(categorias, 
                            `${categorias}.codigo`, 
                            '=', 
                            `${produtos}.codigoCategoria`)

                    .join(fornecedores, 
                            `${fornecedores}.codigo`, 
                            '=' , 
                            `${produtos}.codigoFornecedor`)

                    .select(`${produtos}.codigo as codigo_produto`, 
                            `${produtos}.nome as nome_produto`, 
                            `${produtos}.valor as valor_produto`,  
                            `${produtos}.ativo as ativo`, 
                            `${categorias}.codigo as codigo_categoria`, 
                            `${categorias}.nome as nome_categoria`, 
                            `${fornecedores}.codigo as codigo_fornecedor`, 
                            `${fornecedores}.nome as nome_fornecedor`) 
                                                  
            const resultado = [] 

            retornoCompleto.forEach((produto) => {
            const {
            codigo_produto, nome_produto, valor_produto, ativo, 
            codigo_categoria, nome_categoria, 
            codigo_fornecedor, nome_fornecedor} = produto 
                                    
            resultado.push({nome_produto, codigo_produto, valor_produto, ativo, 
            Categoria: {nome_categoria, codigo_categoria}, 
            Fornecedor: {nome_fornecedor, codigo_fornecedor}
        })   
                
    })
    
    response.status(200).json({Lista_de_produtos : resultado})
     
    }

    catch(error){response.status(400).json({Error: `${error} ` })}
})

routers.get('/:codigo', async function (request, response) {

   try{
   
    const {codigo} = request.params    
    const produto = await database('produtos').where('codigo', codigo).first()

    if(!produto) {
        return response.status(400).json(
            {error: 'Codigo ' + codigo + ' não encontrado' })
    }

    response.status(200).json(produto)}

    catch(error){
        response.status(400).json({Error: `${error}`})}

})

routers.delete('/:codigo', async function (request, response) {

    try{
    const {codigo} = request.params    
    const produto = await database('produtos').where('codigo', codigo).first()

    if(!produto) {
        return response.status(400).json(
            {error: 'Codigo ' + codigo + ' não encontrado' })
    }

    await database('produtos').where('codigo', codigo).delete()

    response.status(204).json() 
    }
    catch(error){
        response.status(400).json({Error: `${error}`})
        }

})

routers.put('/:codigo' ,  celebrate({ 

    body : Joi.object().keys({ 
        nome : Joi.string().min(3).max(30).required(), 
        codigoCategoria : Joi.string().min(36).max(36).required(), 
        codigoFornecedor : Joi.string().min(36).max(36).required(), 
        valor : Joi.number().min(0).required(), 

        })
    
        }) , async function (request, response) {

      try{    

        const {codigo} = request.params    
        const produto = await database('produtos').where('codigo', codigo).first()

        if(!produto) {
            return response.status(400).json(
                {error: 'Codigo ' + codigo + ' não encontrado' })
        }

        //const { nome, codigoCategoria, codigoFornecedor, valor} = request.body

       // const produtoAlterado = { 

       // codigo, 
       // nome, 
       // codigoCategoria, 
       // codigoFornecedor, 
       // valor, 
       // ativo : 1
       //}

       const produtoAlterado = new Produto(

        request.body.codigo, 
        request.body.nome, 
        request.body.codigoCategoria, 
        request.body.codigoFornecedor,  
        request.body.valor, 
        request.body.ativo, true)
     
    await database('produtos').update(produtoAlterado).where('codigo', codigo)

    response.status(200).json({codigo, ... produtoAlterado })   
    }

    catch(error){
    response.status(400).json({Error: `${error}`})
    }

})

module.exports = routers