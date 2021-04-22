import xhrRequest from "./functions/xhrRequest.js";

import Settings from "./functions/web/Settings.js";
import Categories from './functions/categories/Categories.js';
import Products from "./functions/products/Products.js";
import Adverts from "./functions/adverts/Adverts.js";

Settings.initData();
Categories.getCategories();
Adverts.Banner();


import "./functions/hooks.js";