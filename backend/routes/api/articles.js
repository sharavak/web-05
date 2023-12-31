const express = require("express");
const router = express.Router();

const Articles = require('../../models/Article');
const Users = require('../../models/User');
router.get("/articles/:id", async (req, res) => {
    // To render the articles by the user_id
    // Using req.params for getting the user id
    try {
        const user = await Articles.find({ user: req.params.id }); // It will render the list of objects and we can display it in the frontend
        return res.json({ 'totalCount': user.length, user });
    } catch (e) {
        return res.json({ 'totalCount': 0, user: "" });
    }
})

router.post('/articles', async (req, res) => {
    // Code to check if the user is logged in
    const { email } = req.body;
    if (!email) return res.status(400).json({ "error": "Authorization error" });
    try {
        const user = await Users.findOne({ email });
        if (!user) return res.status(400).json({ "error": "Authorization error" });
        const { author, title, description, url, urlToImage, content, name } = req.body;
        const articles = new Articles({ author, title, description, url, urlToImage, content, name });
        articles.user = user._id;
        await articles.save();
        return res.status(200).json({ "success": "Saved!!!" });
    } catch (e) {
        res.status(400).json({ "error": "Authorization error" });
    }
})

router.delete('/articles', async (req, res) => {
    const { email, title } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (!email || !user) return res.status(400).json({ "error": "Authorization error" });
        await Articles.deleteOne({ user: user._id, title: title });
        return res.json({ "success": "Successfully removed!!!" });
    } catch (e) {
        return res.status(400).json({ "error": "Authorization error" });
    }
})

module.exports = router;