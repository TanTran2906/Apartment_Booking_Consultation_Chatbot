import path from 'path';
import express from 'express';
import multer from 'multer';
import AppError from '../middleware/appError.js';
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only image.', 400), false);
    }
}

const upload = multer({
    storage,
    //Kiểm tra file có đúng định dạng không?
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

router.post('/', upload.single('image'), (req, res) => {
    if (req.file) {
        // Nếu có tệp hình ảnh được tải lên, thực hiện xử lý ảnh
        res.send({
            message: 'Image uploaded successfully',
            image: `/${req.file.path.replace(/\\/g, '/')}`,
        });
    }
    else {
        // Nếu không có tệp hình ảnh, trả về thông báo lỗi
        res.status(400).json({ message: 'No image file uploaded' });
    }

});

export default router;
