const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())


const PORT = 3000
const check = req => req.headers.authorization === undefined || req.headers.authorization == null
app.get("/", (req, res) => {
    res.json({ welcome: "Welcome to custom NEWS API" });
})

app.get('/:page', async (req, res) => {
    if (check(req))
        return res.status(401).json({ "error": "Unauthorized" });
    const { page } = req.params;
    let result = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=be4e88d35dc045f6bce46fbb07c93cc3&pageSize=30&page=${page}`);
    result = await result.json();
    res.json(result);
})
app.get("/:category/:page", async (req, res) => {
    if (check(req))
        return res.status(401).json({ "error": "Unauthorized" });
    let { category, page } = req.params;
    page = parseInt(page)
    let result = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=be4e88d35dc045f6bce46fbb07c93cc3&pageSize=30&page=${page}`)
    result = await result.json();
    res.json(result);
})

app.get('*', (req, res) => {
    res.json({ error: "Not found" });
})
app.listen(PORT, () => {
    console.log(`Listening on Port no: ${PORT}`)
})