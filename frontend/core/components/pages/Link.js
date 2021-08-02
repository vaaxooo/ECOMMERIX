export default function Link (page) {
    return `<li class="nav-item">
                <a class="nav-link" href="/page/${page.url}" title="${page.title}" style="padding-right: 0px; padding-left: 20px;""> ${page.title} </a>
            </li>`
}