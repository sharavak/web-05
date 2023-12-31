const mongoose = require('mongoose');

let ArticleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    author: {
        type: String,
        required: true,
        default: 'unknown'
    },
    title: {
        type: String,
        required: true,
        default: 'unknown'
    },
    description: {
        type: String,
        required: true,
        default: 'unknown'
    },
    url: {
        type: String,
        required: true,
        default: 'unknown'
    },
    urlToImage: {
        type: String,
        required: true,
        default: 'unknown'
    },
    content: {
        type: String,
        required: true,
        default: "unknown",
    },
    name: {
        type: String,
        default: 'unknown'
    },
    checked: {
        type: Boolean,
        default: true
    }
})
module.exports = mongoose.model("Articles", ArticleSchema);