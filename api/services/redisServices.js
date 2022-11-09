const { createClient } = require('redis');

const client = createClient({
    url: 'redis://localhost:6379' // set redis url 
});


// connect redis server 
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect()


const getRedisCacheByKey = async (key) => {
    return await client.get(key)
}

const setRedisCache = async (key, value) => {
    await client.set(key, value)
}

const setRedisCacheWithTime = async (key, time, value) => {
    await client.setEx(key, time, value)
}

const getAllRedisKey = async () => {
    return await client.keys('*') // '*' to get all keys
}

const deleteRedisKey = async (keys) => {
    await client.del(keys)
}

module.exports = {
    getRedisCacheByKey,
    setRedisCache,
    getAllRedisKey,
    deleteRedisKey,
    setRedisCacheWithTime
}