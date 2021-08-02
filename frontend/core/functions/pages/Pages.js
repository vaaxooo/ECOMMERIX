import xhrRequest from "../xhrRequest.js";
import Link from "../../components/pages/Link.js";
import Page from "../../components/pages/Page.js";
import FooterLink from "../../components/pages/FooterLink.js";

export default class Pages {

    /**
     * Get pages list
     */
    static getPages() {
        xhrRequest("POST", "/pages/getPages")
            .then(response => {
                let pages = response.pages;
                if (pages) {

                    let blockHeaderLinks = ``;
                    let blockFooterLinks = ``;
                    for (let page of pages) blockHeaderLinks += Link(page);
                    for (let index in pages.length < 6 ? pages : 5) blockFooterLinks += FooterLink(pages[index]);
                    document.getElementById("dynamic-pages").innerHTML = blockHeaderLinks;
                    document.getElementById("dynamic-pages-footer").innerHTML = blockFooterLinks;
                }
            });
    };

    /**
     * Get data page by URL
     * @param page
     */
    static getPage(page) {
        const dynamic_page = document.getElementById("dynamic-page");

        if (dynamic_page) {
            xhrRequest("POST", "/pages/getPageData", {page: page})
                .then(response => {
                    let page = response.page;
                    if (page) {
                        let element = Page(page);
                        dynamic_page.innerHTML = element;
                    }
                });
        }
    }

}