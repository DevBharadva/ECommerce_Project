const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, 'images/productimages')
    },
    filename:function (req,file, cb){
        cb(null,`${Date.now()}_${file.originalname.replace(/\s+/g,"_")}`);
    }
})

const upload = multer({storage: storage});


module.exports = upload;