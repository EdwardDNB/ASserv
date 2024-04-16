const express = require('express');
const router = express.Router();
const { createArticle, deleteArticle,getArticles, deleteImage} = require('../controllers/articleController');
/*const multer = require('multer'); // Для обработки загрузки файлов
const path = require('path');
const fs = require('fs'); // Для работы с файловой системой*/

// Роут для создания новой статьи
router.post('/articles', createArticle);

router.get('/articles', getArticles);

// Роут для удаления статьи по ID
router.delete('/articles/:id', deleteArticle);



// Роут и контроллер для удаления изображений
router.delete('/articles/delete-image/:filename', deleteImage);

// Роут и контроллер для загрузки изображений
// Настройка хранения изображений
/*const storage = multer.diskStorage({
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
});*/










module.exports = router;
