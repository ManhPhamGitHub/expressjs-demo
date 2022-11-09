const modelUser = require('../model/user')
const redisCache = require('../services/redisServices')
const getUser = async (req, res) => {
    try {
        const listUser = await modelUser.find();
        res.send({ data: listUser, status: "success", message: "get list user successs" })
    } catch (error) {
        res.sendStatus(404).json({ error: error, status: 'failure', message: "get list user failure" });
    }
}

const getUserWithRedis = async (req, res) => {
    try {
        const keyUsers = 'users'
        // get data from cache
        const dataCaching = await redisCache.getRedisCacheByKey(keyUsers)
        console.log("dataCaching", dataCaching);
        if (dataCaching) {
            // return if have data
            return res.send({ data: JSON.parse(dataCaching), status: "success", message: "get list user successs" })
        }
        const listUser = await modelUser.find();
        //save data from db in cache with time = 1 day
        redisCache.setRedisCacheWithTime(keyUsers, 60 * 60 * 24, JSON.stringify(listUser))

        res.send({ data: listUser, status: "success", message: "get list user successs" })
    } catch (error) {
        console.log(error);
        res.sendStatus(404).json({ error: error, status: 'failure', message: "get list user failure" });
    }
}

const deleteAllDataCaching = async (req, res) => {
    try {
        const listKeys = await redisCache.getAllRedisKey() // get all keys from server 
        listKeys.map(async (key) => await redisCache.deleteRedisKey(key)) // map all keys to delete it
        res.send({ status: "success", message: "delete all data caching successs" })
    } catch (error) {
        res.sendStatus(404).json({ error: error, status: 'failure', message: "delete data caching failure" });
    }
}


module.exports = {
    getUser,
    getUserWithRedis,
    deleteAllDataCaching
}