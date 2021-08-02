export default function Page (page) {
    return `
        <div class="card card-body mt-3">
            <h2 class="article-title ml-2" title="${page.title}">${page.title}</h2>
            <pre class="article-description">${page.description}</pre>
        </div>
    `;
}