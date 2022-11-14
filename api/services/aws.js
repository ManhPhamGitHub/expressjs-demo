const AWS = require("aws-sdk")
const config = require('../config/config')

const s3 = new AWS.S3({
    accessKeyId: config.ACCESS_KEY,
    secretAccessKey: config.SECRET_ACCESS_KEY,
    region: config.REGION,
    signatureVersion: 'v4',
})

exports.generateSignedUrl = async () => {
    return await s3.getSignedUrlPromise('putObject', {
        Bucket: config.S3_BUCKET,
        Key: 'test',
        Expires: 60
    })
}

exports.putObjectS3 = async (buffer) => {
    const params = {
        Bucket: bucketName + path,
        Key: key,
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg',
        ACL: 'public-read'
    };
    await s3.putObject(params).promise();
}