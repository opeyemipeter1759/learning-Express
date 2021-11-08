const multer = require("multer");
const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith("image/");
        if (isPhoto) {
            next(null, true);
        } else {
            next({ message: `That filetype is not allowed!` }, false);
        }
    },
};
module.exports = {
    upload() {
        return multer(multerOptions).single("photo");
    },

};