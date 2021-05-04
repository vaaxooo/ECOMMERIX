import xhrRequest from "./functions/xhrRequest.js";

import Settings from "./functions/web/Settings.js";
import Categories from './functions/categories/Categories.js';
import Products from "./functions/products/Products.js";
import Adverts from "./functions/adverts/Adverts.js";
import Articles from "./functions/articles/Articles.js";
import Pages from "./functions/pages/Pages.js";

Settings.initData();
Categories.getCategories();
Adverts.Banner();
Articles.getArticles(4);
Pages.getPages();


import "./functions/hooks.js";