export default function cardArticles (article) {

    let image = article.image ? article.image : '//e-commerce.loc/public/assets/images/no-image.png';

    let url_redirect = "/a/" + article.title
            .replace(/[^a-zа-яё0-9\s]/gi, '-')
            .replace(/ /g, "-")
            .toLocaleLowerCase()
            + "-" + article.id.replace(/ /g, "");

    return `<div class="col-md-3 col-sm-6 mt-2">
                <a href="${url_redirect}" class="card card-post article">
                    <img src="${image}" class="card-img-top">
                    <div class="card-body">
                        <h6 class="title" title="${article.title}">${article.title.trunc(50)}</h6>
                        <p class="small text-uppercase text-muted">${article.topic}</p>
                    </div>
                </a>
            </div>`;
}