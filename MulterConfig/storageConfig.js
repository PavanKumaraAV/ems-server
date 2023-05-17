const multer = require('multer')

//storage config
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        filename = 'image' + '-' + Date.now() + file.originalname
        callback(null, filename)
    }
})

// FILTER FILE
const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true)
    } else {

        callback(null, false)
        return calllback(new Error('only .png jpeg jpg formats are allowed'))

    }
}
// UPLOAD FILE
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

// EXPORT FILE
module.exports = upload

