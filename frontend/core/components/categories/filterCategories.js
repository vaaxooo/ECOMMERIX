export default function filterCategories(category) {
    let element = `<label class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="filter-categories-checkbox" value="${category.id}">
                        <div class="custom-control-label">${category.name} <b class="badge badge-pill badge-light float-right">0</b>  </div>
                   </label>`;
    return element;
}