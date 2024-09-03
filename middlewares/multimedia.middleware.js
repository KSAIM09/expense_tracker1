const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|svg|webp|gif|avif/;
    const mimeType = fileTypes.test(file.mimetype);

    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if(mimeType && extname) {
        cb(null, true);
    } else{
        cb(new Error("File Not Supported"), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = upload;