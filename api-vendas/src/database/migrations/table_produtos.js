const knex = require('knex')

exports.up = async (knex) => { 

    return knex.schema.createTable('produtos', (table) => {

        table.uuid('codigo').primary()
        
        table.string('nome', 30).unique().notNullable()

        table.uuid('codigoCategoria').notNullable()
        .references('codigo')
        .inTable('categorias')

        table.uuid('codigoFornecedor').notNullable()
        .references('codigo')
        .inTable('fornecedores')

        table.decimal('valor', 10).notNullable()
        table.integer('ativo').notNullable()

    } )      
}

exports.down = async (knex) => {

    return knex.schema.dropTable('produtos')
}