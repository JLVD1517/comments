var mysql = require("mysql");
var config = require(__dirname + "/../configs/config.json");

var conn = mysql.createPool({
    connectionLimit: config.mysql.connection_limit,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    debug: false,
    queueLimit: 30,
    acquireTimeout: 1000000,
    multipleStatements: true,
});

conn.getConnection(function (err, con) {
    console.log("Error:", err);
});
module.exports = conn;
