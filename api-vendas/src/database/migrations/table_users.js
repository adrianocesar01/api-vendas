const knex =  require('knex')

exports.up = async (knex) => {
    return knex.schema.createTable('users', (table) => {

        table.uuid('codigo').primary()
        
        table.string('nome', 40).unique().notNullable()
        table.string('email', 60).unique().notNullable()
        table.string('senha', 15).notNullable()
        table.integer('ativo').notNullable()


} ) }

exports.down =  async (knex) => {

    return knex.schema.dropTable('users')
}