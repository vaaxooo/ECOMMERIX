export default function Toast(title, message) {
    const toasts = document.getElementById("toasts");
    toasts.innerHTML = "";

    let element = `<div class="p-5" style="z-index: 5">
              <div id="liveToast" class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                  <strong class="me-auto">${title}</strong>
                  <button type="button" class="btn-close toast-button-close" data-bs-dismiss="toast" aria-label="Close" id="toast-close"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
              </div>
            </div>`;

    toasts.innerHTML = element;
    return false;
}