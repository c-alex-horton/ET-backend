const Redis = require('redis')

const redis_client = Redis.createClient();

redis_client.on('error', err => console.log(err));

redis_client.connect()

module.exports = redis_client;