export default function Checkbox (filter) {

    let attributes = ``;
    for(let option of filter.options) {
        option = Object.entries(option)[0];
        let key = option[0];
        let value = option[1];
        let checked = checkFilterAttribue(filter.name, key);
        attributes += `<div class="col-md-6">
                            <label class="custom-control custom-checkbox">
                                <input type="checkbox" ${ checked ? 'checked=""' : '' } class="custom-control-input filter-${filter.name}" data-attribute-name="${key}" onclick="setFilter('${filter.name}')">
                                <div class="custom-control-label">${value}</div>
                            </label>
                        </div>`
    }

    return `<div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${filter.translation}</h5>
                    <div class="row">
                        ${attributes}
                    </div>
                    <button class="btn btn-light btn-sm mt-2" onclick="clearFilter('${filter.name}')" data-translate="reset"></button>
                </div>
            </div>`;

}