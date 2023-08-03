const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images'); // folder for storing uploaded images
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Rename the file to avoid name conflicts
    },
  });
  
const uploadImage = multer({ storage: storage,
limits:{ fileSize: 10000000},
fileFilter:(req, file, cb)=>{
    const fileTypes = /jpeg|jpg|png|gif/
    const mimeType= fileTypes.test(file.mimetype) 
    const extname = fileTypes.test(path.extname(file.originalname))
    if(mimeType && extname){
        return cb(null, true)
    }   
    cb('Give Prorper file format to upload ')
} }).single('image')

module.exports={uploadImage}