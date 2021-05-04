import xhrRequest from "../xhrRequest.js";
import cardArticles from "../../components/articles/cardArticles.js";
import Article from "../../components/articles/Article.js";

export default class Articles {

    static getArticles(count = 21) {
        const articlesList = document.getElementById("articles-list");
        const homepageArticles = document.getElementById("homepage-articles");

        if(articlesList) {

            xhrRequest("POST", "/articles/getArticles", {count: count})
                .then(response => {
                    let articles = response.articles;
                    EINIT.init.articles = articles;
                    articlesList.innerHTML = "";

                    let element = ``;
                    if (articles.length) {
                        for (let article of articles) {
                            element += cardArticles(article);
                        }
                    } else {
                        homepageArticles ? homepageArticles.classList.add("hidden") : null;
                    }

                    articlesList.innerHTML = articlesList.innerHTML + element;
                });

        }
    };

    static getArticle(article) {
        const articleBlock = document.getElementById("article");
        if(articleBlock) {

            xhrRequest("POST", "/articles/getArticleData", {article: article})
                .then(response => {
                    articleBlock.innerHTML = ``;

                    let article = response.article;
                    let element = ``;
                    if (article) {
                        element += Article(article);
                        articleBlock.innerHTML = element;
                    } else {
                        window.location.href = "/";
                    }
                });

        }
    };

}