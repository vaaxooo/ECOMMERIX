export default function navbarCategories(category, index) {
    if (category.name) {
        let url_name = "/c/" + category.name
                            .replace(/[^a-zа-яё0-9\s]/gi, ' ')
                            .replace(/ {1,}/g, '-')
                            .toLocaleLowerCase()
                            + "-" + category.id.replace(/ /g, '');
        let element = "";

        if (+category.parent_id === 0) {
            if(category.children.length > 0){
                element += `<div class="dropdown">`;
                element += `<button class="nav-category dropdown-toggle" type="button" id="category-drop-${category.name}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${category.name}</button>`;
                element += `<div class="dropdown-menu multi-level" role="menu" aria-labelledby="category-drop-${category.name}">`;
                for (let i in category.children) {
                    if(category.children[i].name) {
                        element += dropdownItem(category.children[i]);
                    }
                }
                element += `</div>`;
                element += `</div>`;

            } else {
                element += `<a class="nav-category" href="${url_name}">${category.name}</a>`;

            }

        }

        if(index < +EINIT.site.visible_navbar_categories) {
            return element;
        } else if(index === +EINIT.site.visible_navbar_categories) {
            let more_element = `<div class="dropdown">
                                <button class="nav-category dropdown-toggle" type="button" id="category-drop-more" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${EINIT.translate.more}</button>
                                <div class="dropdown-menu multi-level" role="menu" aria-labelledby="category-drop-more" id="navbar-more-categories">`;
            more_element += element;
            more_element += `</div>
                             </div>`;
            return more_element;
        } else {
            const navbar_more_categories = document.getElementById("navbar-more-categories");
            navbar_more_categories.innerHTML = navbar_more_categories.innerHTML + element;
            return false;
        }

    }
}

function dropdownItem(category) {

    let url_name = "/c/" + category.name
                        .replace(/[^a-zа-яё0-9\s]/gi, ' ')
                        .replace(/ {1,}/g, '-')
                        .toLocaleLowerCase()
                        + "-" + category.id.replace(/ /g, '');
    let element = "";
        if (category.children.length > 0) {
            element += `<div class="dropdown-submenu" >`;
            element += `<button class="nav-category dropdown-toggle" type="button" id="category-drop-${category.name}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="padding-left: 22px;">${category.name}</button>`;
            element += `<div class="dropdown-menu" aria-labelledby="category-drop-${category.name}">`;
            for (let i in category.children) {
                element += dropdownItem(category.children[i]);
            }
            element += `</div>`;
            element += `</div>`;
            return element;
        }


        element += `<a class="dropdown-item" href="${url_name}">${category.name}</a>`;
        return element;
}