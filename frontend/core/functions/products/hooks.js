import QuickProductComponent from "../../components/products/QuickProductComponent.js";

/*
 *  SELECT PRODUCT ATTRIBUTES product.php
 */
window.selectProductAttribute = function selectProductAttribute(product_id) {
    const attribute = event.currentTarget;
    const attributeName = attribute.dataset.attributeName;
    const attributeOption = attribute.dataset.attributeOption;

    let product = EINIT.init.products.filter(item => +item.id === +product_id)[0];

    if(!product.selectedAttributes){
        product.selectedAttributes = [];
    }

    let selectedAttributes = product.selectedAttributes;
    for (let index in selectedAttributes) {
        if (selectedAttributes[index].name === attributeName) {
            selectedAttributes.splice(index, 1);
        }
    }

    selectedAttributes.push({
        name: attributeName,
        option: attributeOption
    });
}

/**
 * RESET PRODUCT ATTRIBUTES product.php
 * @returns {boolean}
 */
window.resetProductAttributes = function resetProductAttributes(){
    const inputAttributes = document.querySelectorAll('label.btn.btn-light.active');
    if(!inputAttributes) {
        return false;
    }

    for(let input of inputAttributes) {
        input.classList.remove("active");
    }

}

/**
 * QUICK PURCHASE PRODUCT
 * @param product_id
 */
window.quickProduct = function quickProduct(product_id) {
    let product = EINIT.init.products.filter(item => +item.id === +product_id)[0];
    let content = QuickProductComponent(product);
    openModal(content);
}