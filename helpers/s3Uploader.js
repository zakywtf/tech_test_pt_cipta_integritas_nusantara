const AWS = require('aws-sdk');
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    params: {
        ACL: 'public-read',
        Bucket: process.env.AWS_S3_BUCKET
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png"
    || file.mimetype === "audio/mpeg" || file.mimetype === "audio/mp4" || file.mimetype === "audio/ogg"
    || file.mimetype === "audio/mid" || file.mimetype === "audio/vnd.wav") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type!"), false);
    }
};

const uploadS3 = multer({
    fileFilter,
    storage: multerS3({
        acl: "public-read",
        s3,
        bucket: process.env.AWS_S3_BUCKET,
        metadata: function (req, file, cb) {
            cb(null, {
                fieldName: file.fieldname
            });
        },
        key: function (req, file, cb) {
            var split = file.originalname.split('.')
            var name = split[0].replace(/[^A-Z0-9]/ig, "_")+'.'+split[1]
            var fullname = Date.now().toString() + '_' + name
            var fullpath = `company-profile/${file.fieldname}/` + fullname
            // console.log({fullpath});
            cb(null, fullpath);
        },
    }),
    limits: {
        fileSize: 5000000
    }
}).fields([
    {
        name: 'services',
        maxCount: 1
    },
    {
        name: 'clients',
        maxCount: 1
    }
]);

module.exports = uploadS3;