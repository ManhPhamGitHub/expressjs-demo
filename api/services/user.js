const modelUser = require('../model/user')
const redisCache = require('../services/redisServices')
const config = require('../config/config')
const formidable = require('formidable');
const fs = require('fs');
const { handleImage } = require('../ulti/index')
// exports.getUser = async (data) => {
//     try {
//         const listUser = await modelUser.find();
//         // res.send({ data: listUser, status: "success", message: "get list user successs" })
//     } catch (error) {
//         // res.sendStatus(404).json({ error: error, status: 'failure', message: "get list user failure" });
//     }
// }

exports.getUserWithRedis = async (data) => {
    try {
        // get data from cache
        const dataCaching = await redisCache.getRedisCacheByKey(config.KEY_REDIS)
        if (dataCaching) {
            // return if have data
            return JSON.parse(dataCaching)
        }
        const listUser = await modelUser.find();
        //save data from db in cache with time = 1 day
        redisCache.setRedisCacheWithTime(config.KEY_REDIS, 60 * 60 * 24, JSON.stringify(listUser))
        return listUser
    } catch (error) {
        console.log(error);
    }
}

exports.deleteAllDataCaching = async (data) => {
    try {
        const listKeys = await redisCache.getAllRedisKey() // get all keys from server 
        listKeys.map(async (key) => await redisCache.deleteRedisKey(key)) // map all keys to delete it
        return
    } catch (error) {
        console.log("error", error);
    }
}

exports.deleteUserServices = async (data) => {
    try {
        const { id } = data;
        await modelUser.findByIdAndDelete(id)
        return 'success'
    } catch (error) {
        console.log("error", error);
        return 'error'
    }
}

exports.addUserServices = async (data) => {
    try {
        await modelUser.create(data)
    } catch (error) {
        console.log(error);
    }
}

exports.addUserServices = async (data) => {
    try {
        await modelUser.create(data)
    } catch (error) {
        console.log(error);
    }
}


exports.uploadImageToS3 = async (req, data) => {
    try {
        handleImage(req)
    } catch (error) {
        console.log(error);
    }
}



