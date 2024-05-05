const express = require('express');
const router = express.Router();
const { createArticle, deleteArticle,getArticles, deleteImage, uploadMiddleware} = require('../controllers/articleController');



router.get('/articles', getArticles);
// Роут для создания новой статьи
//router.post('/articles', createArticle);



// Роут для загрузки изображений и создания статьи
router.post('/articles/', uploadMiddleware, createArticle);


// Роут для удаления статьи по ID
router.delete('/articles/:id', deleteArticle);



// Роут и контроллер для удаления изображений
router.delete('/articles/delete-image/:filename', deleteImage);

// Роут и контроллер для загрузки изображений
// Настройка хранения изображений
/*
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images'); // Каталог для хранения изображений
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '.jpeg'); // Имя файла будет уникальным временным штампом с расширением JPEG
    }
});
const upload = multer({ storage: storage });

router.post('/articles/upload-image', upload.single('image'), (req, res) => {
    res.status(201).json({ success: true, imageUrl: req.file.filename }); // Отправляем только имя файла, а не путь к нему
});
*/










module.exports = router;
