import AppController from '../controller/controller';
import AppView from '../view/appView';
import type { NewsResponse, SourcesResponse } from '../../types/news';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sources = document.querySelector<HTMLElement>('.sources');

        if (!sources) {
            throw new Error('Sources container was not found');
        }

        sources.addEventListener('click', (event: MouseEvent) => {
            this.controller.getNews(
                event,
                (data: NewsResponse) => this.view.drawNews(data),
                () => {
                    const news = document.querySelector<HTMLElement>('.news');
                    if (news) news.textContent = 'Could not load stories. Please select the source again.';
                }
            );
        });

        this.controller.getSources(
            (data: SourcesResponse) => this.view.drawSources(data),
            () => {
                sources.textContent = 'Could not load sources. Please refresh the page.';
            }
        );
    }
}

export default App;
