import Card from "./Card";
import { useState, useEffect } from "react";
import './Home.css'
const ReadLater = () => {
    let id = JSON.parse(localStorage.getItem('user-info'));
    let dis = 'No saved articles found!!!'
    if (id)
        id = id._id;
    else
        dis = 'Please Sign in to see your saved articles!!!';

    const [articles, setArticles] = useState([]);
    async function fetchArticles() {
        let res = await fetch(`https://news-api-nine-iota.vercel.app/api/users/articles/${id}`);
        res = await res.json();
        setArticles(res.user);
        console.log(res);
    }
    useEffect(() => {
        setArticles([]);
        fetchArticles();
    }, []);
    return (
        <div>
            {articles && articles.length > 0 ?
                (<Card data={articles} />) :
                (<h3 style={{ textAlign: "center", fontFamily: "monospace", fontSize: "2rem", color: "green" }}>{dis}</h3>
                )}
        </div>
    )

}
export default ReadLater