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

module.exports = router;
