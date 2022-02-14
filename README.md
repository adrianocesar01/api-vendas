npm init -y       
npm i express 
npm i uuidv4
npm i knex   
npm i sqlite3 
npm i celebrate 
npm i joi-password
npx knex --knexfile ./src/database/knexfile.js migrate:latest
npm src/server.js
