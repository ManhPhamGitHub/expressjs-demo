const { getUserWithRedis, deleteUserServices, addUserServices, uploadImageToS3 } = require('../services/user')
const { generateSignedUrl, putObjectS3 } = require('../services/aws')
const formidable = require('formidable')

const admin = async (req, res) => {
    const listUsers = await getUserWithRedis()
    var headline = 'Framgia Viet Nam';
    var tagline = "IT là lĩnh vực công bình và không giới hạn, nơi mỗi cá nhân được chia sẻ cơ hội và nhìn nhận thông qua nỗ lực thực sự. Tận dụng những lợi thế của IT mang lại, chúng tôi không ngừng hoàn thiện, trở thành nền tảng cho sự phát triển dịch vụ toàn cầu.";

    res.render('admin', {
        headline: headline,
        listUsers: listUsers,
    });
}

const deleteUser = async (req, res) => {
    const deleteStatus = await deleteUserServices(req.body)
    console.log("deleteStatus", deleteStatus);
    res.send({ message: deleteStatus, status: 'success' })
}

const viewAddUser = async (req, res) => {
    res.render('add-user')
}

const addUser = async (req, res) => {
    // const preSignedUrl = await generateSignedUrl()
    let data = {};
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.log(files);
        data.name = fields.name;
        data.age = fields.age;
        let tmpPath = files.file.filepath;
        let tenFile = files.file.originalFilename;
    });
    addUserServices({ data })
    res.send('add-user')
}
module.exports = {
    admin,
    deleteUser,
    viewAddUser,
    addUser
}