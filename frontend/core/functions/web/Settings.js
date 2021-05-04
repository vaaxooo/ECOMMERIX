import xhrRequest from "../xhrRequest.js";

export default class Settings {

    /**
     * INITIALIZE DATA
     */
    static initData() {
        xhrRequest("POST", "/web/getSerializeData")
            .then(response => {
                const web = response.data.web;
                const currencies = response.data.currencies;
                const languages = response.data.languages;

                EINIT.translate = JSON.parse(response.data.language_translate);

                EINIT.translate = JSON.parse(JSON.stringify(Object.assign(EINIT.translate, {
                    web_name: web.name,
                    web_description: web.description,
                    web_phone: web.phone ? EINIT.translate.call_us + web.phone : ""
                })));

                /**
                 * AUTO-TRANSLATE
                 * @type {NodeListOf<Element>}
                 */
                let translateBlock = document.querySelectorAll("[data-translate]");
                translateBlock.forEach((querySelector) => {

                    let translate_name = querySelector.dataset.translate;
                    if(querySelector){
                        querySelector.innerHTML = EINIT.translate[translate_name] + querySelector.innerHTML;
                    }
                });

                let observer = new MutationObserver(mutations => {
                    for(let mutation of mutations) {
                        for(let node of mutation.addedNodes) {

                            if (!(node instanceof HTMLElement)) continue;

                            if (node.matches('[data-translate]')) {
                                let translate_name = node.dataset.translate;
                                node.innerHTML = EINIT.translate[translate_name];
                            }


                            for(let elem of node.querySelectorAll("[data-translate]")) {
                                let translate_name = elem.dataset.translate;
                                elem.innerHTML = EINIT.translate[translate_name];
                            }

                        }

                    }

                });

                let body = document.documentElement;

                observer.observe(body, {subtree: true, childList: true});
                let mutationRecords = observer.takeRecords();

                /**
                 * END AUTO-TRANSLATE
                 */

                document.querySelector("meta[name='description']").setAttribute("content", web.description);
                document.querySelector("meta[name='keywords']").setAttribute("content", web.tags);
                document.title = web.name;


                !localStorage.getItem("language")
                            ? localStorage.setItem("language", web.default_language) : null;
                !localStorage.getItem("currency")
                    ? localStorage.setItem("currency", web.default_currency) : null;

                let default_language = localStorage.getItem("language")
                    ? localStorage.getItem("language")
                    : web.default_language;
                let default_currency = localStorage.getItem("currency")
                    ? localStorage.getItem("currency")
                    : web.default_currency;

                this.currencies(currencies, default_currency);
                this.languages(languages, default_language);

                EINIT.site.visible_navbar_categories = web.visible_navbar_categories
            });
    }

    /**
     * SHOW CURRENCIES AND SET DEFAULT CURRENCY
     * @param currencies
     * @param default_currency
     */
    static currencies (currencies, default_currency) {
        const web_currencies = document.getElementById("web_currencies");
        if(!currencies) {
            web_currencies.classList.add("hidden");
        }

        let element = ``;
        for(let currency of currencies) {
            if(currency.name === default_currency){
                document.getElementById("web_currency").innerHTML = default_currency;
            }

            if(currency.name !== default_currency) {
                element += `<li>
                            <a class="dropdown-item" href="#" data-code="${currency.code}">${currency.name}</a>
                        </li>`;
            }

        }

        web_currencies.innerHTML = web_currencies.innerHTML + element;
    };

    /**
     * SHOW LANGUAGES AND SET DEFAULT LANGUAGE
     * @param languages
     * @param default_language
     */
    static languages (languages, default_language) {
        const web_languages = document.getElementById("web_languages");
        if(!languages) {
            web_languages.classList.add("hidden");
        }

        let element = ``;
        for(let language of languages) {

            if(language.code === default_language){
                document.getElementById("web_language").innerHTML = language.name;
            }

            if(language.code !== default_language) {
                element += `<li>
                            <a class="dropdown-item" href="#" data-code="${language.code}" onclick="changeLanguage('${language.code}')">${language.name}</a>
                        </li>`;
            }

        }
        web_languages.innerHTML = web_languages.innerHTML + element;
    };

}