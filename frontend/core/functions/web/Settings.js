import xhrRequest from "../xhrRequest.js";

export default class Settings {

    static initData() {
        xhrRequest("GET", "/web/getSerializeData")
            .then(response => {
                const web = response.data.web;
                const currencies = response.data.currencies;
                const languages = response.data.languages;

                const selectors = [
                    "#web_name",
                    "#web_description",
                    "#web_phone",
                ];

                const docs = {
                    "#web_name": web.name,
                    "#web_description": web.description,
                    "#web_phone":  web.phone ? `Позвоните нам: ` + web.phone : "",
                }

                document.querySelector("meta[name='description']").setAttribute("content", web.description);
                document.querySelector("meta[name='keywords']").setAttribute("content", web.tags);
                document.title = web.name;

                for (let selector of selectors) {
                    let querySelectorAll = document.querySelectorAll(selector);

                    querySelectorAll.forEach((querySelector) => {
                        if(querySelector){
                            querySelector.innerHTML = docs[selector];
                        }
                    });
                }

                this.currencies(currencies, web.default_currency);
                this.languages(languages, web.default_language);

                EINIT.site.visible_navbar_categories = web.visible_navbar_categories

            });
    }


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
                            <a class="dropdown-item" href="#" data-code="${language.code}">${language.name}</a>
                        </li>`;
            }

        }
        web_languages.innerHTML = web_languages.innerHTML + element;
    };

}