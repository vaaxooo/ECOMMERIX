export default function Banner (advert, index) {
    let banner_active = index === 0 ? "active" : "";
    let image = advert.image ? advert.image : "//e-commerce.loc/public/assets/images/no-image.png";
    let element = `<div class="carousel-item ${banner_active}" data-bs-interval="10000">
                        <div class="bg-faded-info rounded-3 py-4">
                            <div class="row align-items-center">
                                <div class="col-md-5">
                                    <div class="px-4 pe-sm-0 ps-sm-5 mb-5"><span class="badge bg-primary text-white text-uppercase">Ограниченное предложение</span>
                                        <h2 class="mt-5">${advert.title}</h2>
                                        <p class="h5 text-body fw-light">${advert.description}</p>
                                        <a class="btn btn-primary mt-5" href="${advert.url_redirect}">${advert.url_name} <i class="ci-arrow-right fs-ms ms-1"></i></a>
                                    </div>
                                </div>
                                <div class="col-md-7 text-center">
                                    <img src="${image}" alt="${advert.title}" height="359px">
                                </div>
                            </div>
                        </div>
                    </div>`;
    return element;
}