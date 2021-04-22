export default function cardCategories(category, big = 2) {
    if (category.name) {
        let url_name = "/category/" + category.name
                                .replace(/[^a-zа-яё0-9\s]/gi, ' ')
                                .replace(/ /g, "-")
                                .toLocaleLowerCase()
                                + "-" + category.id.replace(/ /g, "");
        let image = category.image ? category.image : '//e-commerce.loc/public/assets/images/no-image.png';

        let element = "";

        if (big === 0) {
            element += `<div class="col-md-8 mt-2">
                            <a href="${url_name}" class="card-banner" style="min-height:230px; background-image: url('${image}');">
                                <div class="card-body caption text-white">
                                    <h3 class="card-title">${category.name}</h3>
                                    <p class="card-text" style="max-width: 400px">${category.short_description ? category.short_description : ""}</p>
                                </div>
                            </a>
                        </div>`;
        } else if (big === 1) {
            element += `<div class="col-md-4 mt-2">
                            <a href="${url_name}" class="card-banner" style="min-height:230px; background-image: url('${image}');">
                                <div class="card-body caption text-white">
                                    <h5 class="card-title">${category.name}</h5>
                                    <p class="card-text">${category.short_description ? category.short_description : ""}</p>
                                </div>
                            </a>
                        </div>`;
        } else {
            element += `<div class="col-md-4 mt-4">
                            <a href="${url_name}" class="card-banner" style="height:220px; background-image: url('${image}');">
                                <article class="card-body caption text-white ">
                                    <h5 class="card-title">${category.name}</h5>
                                    <p>${category.short_description ? category.short_description : ""}</p>
                                </article>
                            </a>
                        </div>`;
        }

        return element;
    }
}