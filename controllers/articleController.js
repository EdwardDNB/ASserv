const Article = require('../models/Article');
const fs = require("fs");
const path = require('path');
const multer = require('multer');

exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Настройка multer для сохранения изображений
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../images'); // Каталог для хранения изображений
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '.jpeg'); // Имя файла будет уникальным временным штампом с расширением JPEG
    }
});
upload = multer({storage: storage});
exports.uploadMiddleware = upload.array([{ name: 'imageUrl', maxCount: 1 }, { name: 'fullImageUrl', maxCount: 1 }]);

// Контроллер для создания новой статьи
exports.createArticle = async (req, res) => {
   /*  if (!req.files || !req.files['imageUrl'] || !req.files['fullImageUrl']) {
        return res.status(400).json({ success: false, error: 'Missing image files' });
    }*/
    try {
        // Получаем данные статьи и имена загруженных изображений
        const { title, preview, date, content, id, source, sourceName,imageUrl,
            fullImageUrl } = req.body;
        // Проверяем наличие файлов изображений
     /*   console.log(req.files['imageUrl'][0])
        console.log(req.files['fullImageUrl'][0].filename)
        const imageUrl = req.files['imageUrl'] ? req.files['imageUrl'][0].filename : ""; // Имя файла загруженного изображения
        const fullImageUrl = req.files['fullImageUrl'] ? req.files['fullImageUrl'][0].filename : ""; // Имя файла загруженного полноразмерного изображения
*/
        // Создаем новую статью с данными и именами изображений
        const article = new Article({
            title,
            preview,
            date,
            content,
            id,
            source,
            sourceName,
            imageUrl,
            fullImageUrl
        });

        // Сохраняем статью в базу данных
        await article.save();
               // Отправляем ответ с успешно созданной статьей
        res.status(201).json({ success: true, data: article });
    } catch (error) {
        // Отправляем ответ с ошибкой, если что-то пошло не так
        res.status(500).json({ success: false, error: error.message });
    }
}

// Контроллер для удаления статьи по ID
exports.deleteArticle = async (req, res) => {
    try {
        await Article.findOneAndDelete({id: req.params.id});

        res.json({message: 'Article deleted'});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
};
exports.deleteImage = async (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '../images/', filename);

    // Удаляем файл изображения с сервера
    fs.unlink(imagePath, (err) => {
        if (err) {
            res.status(500).json({success: false, error: err.message});
        } else {
            res.status(200).json({success: true, message: 'Image deleted successfully'});
        }
    });
}