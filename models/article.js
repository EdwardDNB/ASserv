const mongoose = require('mongoose');

/*mongoose.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});*/

const articleSchema = new mongoose.Schema({
    title: {type: String},
    preview: {type: String},
    date: {type: String, default: ""},
    imageUrl: {type: String},
    fullImageUrl: {type: String},
    content: {type: String},
    id: {type: String},
    source: {type: String},
    sourceName: {type: String}
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
