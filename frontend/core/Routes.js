import Products from "./functions/products/Products.js";
import Articles from "./functions/articles/Articles.js";
import Pages from "./functions/pages/Pages.js";


export default function Routes() {
    var url = EINIT.getCurrentUrl();
    switch(url[0]) {
        case "c":
            var url_path = url[0] === "c" ? url[1] : null;
            EINIT.params.selectCategory = url_path;
            break;
        case "p":
            Products.getProduct(url[1]);
            break;
        case "a":
            Articles.getArticle(url[1]);
            break;
        case "page":
            Pages.getPage(url[1]);
            break;
        case "wishlist":
            getFCProducts("wishlist");
            break;
        case "cart":
            getFCProducts("cart");
            break;
    }
}