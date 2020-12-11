const mysql= require('mysql')

const connection = mysql.createConnection({
    host : process.env.HOST,
    user : process.env.TEST,
    password : process.env.PASSWORD,
    database: process.env.DATABASE
})


module.exports = connection
