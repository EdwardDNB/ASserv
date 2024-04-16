const Article = require('../models/Article');
const fs = require("fs");


exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
// Контроллер для создания новой статьи
exports.createArticle = async (req, res) => {
    try {
        const {title, preview, date, imageUrl, fullImageUrl, content, id, source, sourceName} = req.body;

        const article = new Article({
            title,
            preview,
            date,
            imageUrl,
            fullImageUrl,
            content,
            id,
            source,
            sourceName
        });

        await article.save();
                res.status(201).json({success: true, data: article});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
};

// Контроллер для удаления статьи по ID
exports.deleteArticle = async (req, res) => {
    try {
       await Article.findOneAndDelete({id: req.params.id});

        res.json({ message: 'Article deleted' });
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
};
exports.deleteImage = async (req, res) => {
    const filename = req.params.filename;
    const imagePath = '../images/' + filename;

    // Удаляем файл изображения с сервера
    fs.unlink(imagePath, (err) => {
        if (err) {
            res.status(500).json({success: false, error: err.message});
        } else {
            res.status(200).json({success: true, message: 'Image deleted successfully'});
        }
    });
}