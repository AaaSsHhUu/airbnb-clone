import multer from "multer";

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './public');
    },

    filename(req, file, callback){
        callback(null, file.originalname)
    }
})

const upload = multer({storage});
export const uploadSingle = upload.single("image");
export const uploadNone = upload.none();