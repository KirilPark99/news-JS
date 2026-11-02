import AppLoader from './appLoader';
import type { ApiCallback, NewsResponse, SourcesResponse } from '../../types/news';

class AppController extends AppLoader {
    public getSources(callback: ApiCallback<SourcesResponse>, onError: () => void): void {
        const endpoint = __USE_API_MOCKS__ ? 'mocks/sources' : 'sources';

        super.getResp<SourcesResponse>({ endpoint }, callback, onError);
    }

    public getNews(event: MouseEvent, callback: ApiCallback<NewsResponse>, onError: () => void): void {
        if (!(event.target instanceof Element) || !(event.currentTarget instanceof HTMLElement)) {
            return;
        }

        const sourceButton = event.target.closest<HTMLButtonElement>('.source__item');
        const sourceId = sourceButton?.dataset.sourceId;
        const sourcesContainer = event.currentTarget;

        if (!sourceButton || !sourceId || sourcesContainer.dataset.selectedSource === sourceId) {
            return;
        }

        sourcesContainer.dataset.selectedSource = sourceId;
        sourcesContainer.querySelectorAll<HTMLButtonElement>('.source__item').forEach((button) => {
            button.setAttribute('aria-pressed', String(button === sourceButton));
        });

        const endpoint = __USE_API_MOCKS__ ? 'mocks/everything' : 'everything';

        super.getResp<NewsResponse>(
            { endpoint, options: { sources: sourceId } },
            (data) => {
                if (sourcesContainer.dataset.selectedSource === sourceId) {
                    callback(data);
                }
            },
            () => {
                if (sourcesContainer.dataset.selectedSource === sourceId) {
                    delete sourcesContainer.dataset.selectedSource;
                    sourceButton.setAttribute('aria-pressed', 'false');
                    onError();
                }
            }
        );
    }
}

export default AppController;
