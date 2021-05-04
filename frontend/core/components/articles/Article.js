export default function Article(article) {

    return `
        <div class="card card-body">
            <h2 class="article-title ml-2" title="${article.title}">
                ${article.title} 
                <div class="d-block">
                    <span class="article-subtitle" data-translate="date_of_publication"></span> 
                    <span class="article-subtitle">${article.created_at}</span> 
                </div>
            </h2>
            <pre class="article-description">${article.description}</pre>
        </div>
    `;
}