export default function cardCategories(category, big = 2) {
    if (category.name) {
        let url_name = "/c/" + category.name
                                .replace(/[^a-zа-яё0-9\s]/gi, ' ')
                                .replace(/ /g, "-")
                                .toLocaleLowerCase()
                                + "-" + category.id.replace(/ /g, "");
        let image = category.image ? category.image : '//e-commerce.loc/public/assets/images/no-image.png';

        let element = `<div class="col-md-4">
                        <a href="${url_name}" class="card-banner" style="height:220px; background-image: url('${image}');">
                            <article class="card-body caption text-white ">
                                <h5 class="card-title">${category.name}</h5>
                                <p>${category.short_description ? category.short_description : ""}</p>
                            </article>
                        </a>
                    </div>`;


        return element;
    }
}