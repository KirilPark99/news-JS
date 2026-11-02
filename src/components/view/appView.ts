import News from './news/news';
import Sources from './sources/sources';
import type { NewsResponse, SourcesResponse } from '../../types/news';

class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    public constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: NewsResponse): void {
        this.news.draw(data.articles);
    }

    public drawSources(data: SourcesResponse): void {
        this.sources.draw(data.sources);
    }
}

export default AppView;
