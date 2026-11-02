import type { NewsArticle } from '../../../types/news';
import './news.css';

class News {
    public draw(data: NewsArticle[]): void {
        const template = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        const newsContainer = document.querySelector<HTMLElement>('.news');

        if (!template || !newsContainer) {
            throw new Error('News template or container was not found');
        }

        const fragment = document.createDocumentFragment();
        const articles = data.slice(0, 10);

        if (articles.length === 0) {
            newsContainer.textContent = 'No stories were found for this source.';
            return;
        }

        articles.forEach((article) => {
            const newsClone = template.content.cloneNode(true) as DocumentFragment;
            const image = newsClone.querySelector<HTMLElement>('.news__meta-photo')!;
            const author = newsClone.querySelector<HTMLElement>('.news__meta-author')!;
            const date = newsClone.querySelector<HTMLTimeElement>('.news__meta-date')!;
            const title = newsClone.querySelector<HTMLElement>('.news__description-title')!;
            const source = newsClone.querySelector<HTMLElement>('.news__description-source')!;
            const description = newsClone.querySelector<HTMLElement>('.news__description-content')!;
            const readMore = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a')!;

            if (article.urlToImage) {
                image.style.backgroundImage = `url("${article.urlToImage}")`;
            }

            author.textContent = article.author || article.source.name || 'News desk';

            const publishedDate = article.publishedAt ? new Date(article.publishedAt) : null;

            if (publishedDate && !Number.isNaN(publishedDate.getTime())) {
                date.dateTime = publishedDate.toISOString();
                date.textContent = new Intl.DateTimeFormat('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                }).format(publishedDate);
            } else {
                date.textContent = 'Date unavailable';
            }

            title.textContent = article.title || 'Untitled story';
            source.textContent = article.source.name || 'News';
            description.textContent = article.description || 'Open the original article to read more.';

            if (/^https?:\/\//i.test(article.url)) {
                readMore.href = article.url;
            } else {
                readMore.removeAttribute('href');
                readMore.removeAttribute('target');
                readMore.setAttribute('aria-disabled', 'true');
            }

            fragment.append(newsClone);
        });

        newsContainer.replaceChildren(fragment);
    }
}

export default News;
