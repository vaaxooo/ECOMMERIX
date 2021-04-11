const WEB = {};

(function (self) {

    self.DATA = {
        web: {},
        currencies: {},
        languages: {},
    };

    self.init = function () {
            self.http_request("GET", "/web/getSerializeData").then(response => {

                const web = response.data.web;
                const currencies = response.data.currencies;
                const languages = response.data.languages;

                self.DATA.web = web;
                self.DATA.currencies = currencies;
                self.DATA.languages = languages;

                const selectors = [
                    "#web_name",
                    "#web_phone",
                    "#web_currencies",
                    "#web_languages"
                ];

                const docs = {
                    "#web_name": web.name,
                    "#web_phone": web.phone,
                    "#web_currencies": web.default_currency,
                    "#web_languages": web.default_language
                }

                document.querySelector("meta[name='description']").setAttribute("content", web.description);
                document.querySelector("meta[name='keywords']").setAttribute("content", web.tags);
                document.title = web.name;

                for (let selector of selectors) {
                    let querySelectorAll = document.querySelectorAll(selector);

                    querySelectorAll.forEach((querySelector) => {
                        querySelector.innerHTML = docs[selector];
                    });
                }

                self.currencies(currencies);
                self.languages(languages);

            });
        /* CHANGE CODE IN FUTURE */

    };

    self.currencies = function (currencies) {
        const web_currencies = document.getElementById("web_currencies");
        if(!currencies) {
            web_currencies.classList.add("hidden");
        }

        for(let currency of currencies) {
            let element = `<option 
                                value="${currency.code}" 
                                ${ currency.name === self.DATA.web.default_currency ? "selected" : "" } />
                                ${currency.name}
                          </option>`;
            web_currencies.innerHTML = web_currencies.innerHTML + element;
        }
    }

    self.languages = function (languages) {
        const web_languages = document.getElementById("web_languages");
        if(!languages) {
            web_languages.classList.add("hidden");
        }

        for(let language of languages) {
            let element = `<option 
                                value="${language.code}" 
                                ${ language.code === self.DATA.web.default_language ? "selected" : "" } />
                                ${language.name}
                          </option>`;
            web_languages.innerHTML = web_languages.innerHTML + element;
        }
    };

    self.parseDATA = function (array) {
        return JSON.parse(array);
    };

    self.http_request = function (method = "GET", URL = null, params = {}) {
        return new Promise((resolve, reject) => {
            let form = new FormData();
            form.append("params", JSON.stringify(params));

            const xhr = new XMLHttpRequest();
            xhr.open(method, API_URL + URL);
            xhr.onload = () => resolve(JSON.parse(xhr.responseText));
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(form);
        });

    };

})(WEB);