import xhrRequest from "../xhrRequest.js";
import banner from "../../components/adverts/banner.js";

export default class Adverts {

    static Banner () {
        const blockBanner = document.getElementById("slider-items");
        if(blockBanner) {
            xhrRequest("POST", "/adverts/getBannerAdverts")
                .then(response => {

                    let element = `<div class="carousel-inner">`;
                    if (response.adverts.length > 0) {

                        for(let i = 0; i < response.adverts.length; i++) {
                            element += banner(response.adverts[i], i);
                        }

                        element += `</div>`;
                        blockBanner.innerHTML = element + blockBanner.innerHTML;
                    }else{
                        blockBanner.classList.add("hidden");
                    }

                });
        }
    }

}