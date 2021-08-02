export default function xhrRequest(method = "POST", URL = null, params = null) {

    const API = "//api.e-commerce.loc";
    const language = localStorage.getItem("language");

    return new Promise((resolve, reject) => {
        let form = new FormData();
        form.append("params", JSON.stringify(params));
        form.append("language", language);

        const xhr = new XMLHttpRequest();
        xhr.open(method, API + URL);
        xhr.onload = () => resolve(JSON.parse(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(form);
    });

};