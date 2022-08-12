const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "xw4r10ckx",
    host: "localhost",
    port: 5432,
    database: "emotiontrackdev"
})

module.exports = pool