//Creating the connection object 
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: '192.168.56.102',
  user: 'foxsarh',
  password: '123',
  database: 'recipes'
})

module.exports = {connection};