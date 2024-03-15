const knex = require('knex')
const path = require('path')

const database = knex(

    {
        client: 'sqlite3',
        connection: { 
            filename: path.resolve(__dirname, 'dbVendas.sqlite')

        } 
        
        ,

        useNullAsDefault : true

    }

)

module.exports = database