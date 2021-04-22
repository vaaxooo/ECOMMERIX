import '../init.js';
import xhrRequest from "../xhrRequest.js";
import navbarCategories from "../../components/categories/navbarCategories.js";
import cardCategories from "../../components/categories/cardCategories.js";
import filterCategories from "../../components/categories/filterCategories.js";

const category_list = [];

export default class Categories {

    static getCategories () {
        xhrRequest("GET", "/categories/getCategories")
            .then(response => {

                let categories = [];
                categories = this.buildTree(response.categories);
                this.generetaCategory(categories);
                this.generateCardCategories(categories);
                this.generateFilterCategories(categories);
            });
    };


    static generateCardCategories(categories) {
        const categories_cart = document.getElementById("categories-card");
        if(categories_cart) {
            let element = ``;
            for(let i = 0; i < 5; i++) {
                element += cardCategories(categories[i], i);
            }
            categories_cart.innerHTML = categories_cart.innerHTML + element;
        }
    };

    static generateFilterCategories(categories) {
        const categories_filter = document.getElementById("categories-filter");
        if(categories_filter) {
            let element = ``;
            for(let category of categories) {
                element += filterCategories(category);
            }

            categories_filter.innerHTML = element + categories_filter.innerHTML;
        }
    };


    /*
    * BUILD CATEGORIES TREE
    * */

    static generetaCategory (categories) {
        categories.forEach((category, index) => {
            let element = navbarCategories(category, index);


/*                if (category.children) {
                    for (let c of category.children) {
                        var subelement = navbarCategories(c);
                        element = element + subelement;
                    }
                }*/
            if(element) {
                document.getElementById("categories-list-navbar").innerHTML = document.getElementById("categories-list-navbar").innerHTML + element;
            }
        });
    };

    static buildTree (data, options) {
        options = options || {};
        var ID_KEY = options.idKey || 'id';
        var PARENT_KEY = options.parentKey || 'parent_id';
        var CHILDREN_KEY = options.childrenKey || 'children';

        var tree = [],
            childrenOf = {};
        var item, id, parentId;

        for (var i = 0, length = data.length; i < length; i++) {
            item = data[i];
            id = item[ID_KEY];
            parentId = item[PARENT_KEY] || 0;
            childrenOf[id] = childrenOf[id] || [];
            item[CHILDREN_KEY] = childrenOf[id];
            if (parentId != 0) {
                childrenOf[parentId] = childrenOf[parentId] || [];
                childrenOf[parentId].push(item);
            } else {
                tree.push(item);
            }
        }

        return tree;
    };
    /* END */

}