const EINIT = {};

(function (self) {
    self.params = {
        productsCount: 0,
        currentProducts: 0,
        maxProducts: 0,
        selectCategory: null,
        selectSort: "all",
        page: 1
    };

    self.init = {
        categories: {},
        products: {},
        adverts: {}
    };

    self.site = {
        visible_navbar_categories: 7
    }

    /*
    * CONTROL URL INPUT
    * */

    self.mapUrlParams = function (params) {
        let url_params = params.split("&");
        params = {};
        for (let i in url_params) {
            let temp_params = url_params[i].split("=");
            params[i] = {
                "name": temp_params[0],
                "param": temp_params[1]
            };
        }
        return params;
    }

    self.getUrlParam = function (name) {
        var s = window.location.search;
        s = s.match(new RegExp(name + '=([^&=]+)'));
        return s ? s[1] : self.params[name];
    };

    self.changeParams = function (prmName, value) {
        let res = '';
        let d = location.href.split("#")[0].split("?");
        let base = d[0];
        let query = d[1];
        if (query) {
            let params = query.split("&");
            for (let param of params) {
                let keyval = param.split("=");
                if (keyval[0] != prmName) {
                    res += param + '&';
                }
            }
        }
        res += prmName + '=' + value;
        history.pushState('', '', base + '?' + res);

        EINIT.params.selectSort = self.mapUrlParams(res);
        return false;
    };

    self.getCurrentUrl = function getCurrentUrl() {
        var url = window.location.pathname.split("/");
        url.shift();
        return url;
    }

    /* END */

})(EINIT);