export default function xhrRequest(method = "GET", URL = null, params = null) {

    const API = "http://api.e-commerce.loc";

    return new Promise((resolve, reject) => {
        let form = new FormData();
        form.append("params", JSON.stringify(params));

        const xhr = new XMLHttpRequest();
        xhr.open(method, API + URL);
        xhr.onload = () => resolve(JSON.parse(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(form);
    });

};