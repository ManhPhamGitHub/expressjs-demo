const formidable = require('formidable')
const fs = require('fs')
exports.handleImage = async (req) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.log(files);
        let name = fields.name;
        let age = fields.age;
        let tmpPath = files.file.filepath;
        let tenFile = files.file.originalFilename;
    });
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