export default function CheckboxBlock (filter) {

    let attributes = ``;
    for(let option of filter.options) {
        option = Object.entries(option)[0];
        let key = option[0];
        let value = option[1];
        let checked = checkFilterAttribue(filter.name, key);

        attributes += `<label class="checkbox-btn">
            <input type="checkbox" ${ checked ? 'checked=""' : '' } class="filter-${filter.name}" data-attribute-name="${key}" onclick="setFilter('${filter.name}')">
            <span class="btn btn-light">${value}</span>
        </label>`;
    }

    return `<div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${filter.translation}</h5>
                        ${attributes}
                </div>
            </div>`;

}