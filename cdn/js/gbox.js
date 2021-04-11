window.addEventListener("load", function () {

    const gbox = document.getElementById('e-product-image-gbox');
    const gbox_block = document.getElementById('gbox');
    const gbox_close = document.getElementById('gbox-close');

    if (gbox) {
        gbox.addEventListener('click', function (event) {
            event.preventDefault();
            const url_image = gbox.getAttribute("href");
            const image = url_image ? url_image : '//cdn.e-commerce.loc/images/no-image.png';

            let element = `<div class="gbox-overlay"></div>
                <div class="m-auto">
                    <div class="gbox-content">

        
                        <div class="gbox-toolbar">
                            <button data-fancybox-close="" class="gbox-button gbox-button--close" title="Close" id="gbox-close" onclick="closeGBOX()">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"></path>
                                </svg>
                            </button>
                        </div>

                        <div class="gbox-content-image">
                            <img src="${image}" class="gbox-content-image preview" alt="Preview" />
                        </div>
                    </div>
                </div> `;

            gbox_block.innerHTML = element;

        });
    }

});

function closeGBOX() {
    const gbox_block = document.getElementById('gbox');
    const gbox_close = document.getElementById('gbox-close');

    gbox_block.innerHTML = "";
    gbox_block.classList.add = "hidden";
}
