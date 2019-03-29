const redis = require('redis');
const socketEmitter = require('socket.io-emitter');

const redisClient = redis.createClient('redis://127.0.0.1:6379');

module.exports = socketEmitter(redisClient);
