export default function FooterLink (page) {
    return `<li>
                <a href="/page/${page.url}" title="${page.title}"> ${page.title} </a>
            </li>`
}