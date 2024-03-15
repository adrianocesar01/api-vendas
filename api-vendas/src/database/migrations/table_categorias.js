const knex = require('knex')

exports.up = async (knex) => { 

    return knex.schema.createTable('categorias', (table) => {

        table.uuid('codigo').primary()
        table.string('nome', 30).unique().notNullable()
    } )      
}

exports.down = async (knex) => {

    return knex.schema.dropTable('categorias')
}