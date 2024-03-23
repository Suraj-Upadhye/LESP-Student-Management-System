import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {

    // this is for future scope where we need to name each file uniquely
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
    // cb(null,file.fieldname + "-" + uniqueSuffix)
    // cb(null,"image-"+uniqueSuffix+".png");

    cb(null, Date.now() + file.originalname)
  }
})

export const upload = multer({
  storage,
})