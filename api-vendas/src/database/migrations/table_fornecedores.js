const knex = require('knex')

exports.up = async (knex) => { 

    return knex.schema.createTable('fornecedores', (table) => {

        table.uuid('codigo').primary()
        table.string('nome', 30).unique().notNullable()
        table.string('email', 30).notNullable()
        table.string('telefone', 20).notNullable()
    } )      
}

exports.down = async (knex) => {

    return knex.schema.dropTable('fornecedores')
}