import type { ApiCallback, ApiRequest, ApiResponse } from '../../types/news';
import { ApiStatus, RequestMethod } from '../../types/news';

class Loader {
    public constructor(private readonly baseLink: string) {}

    public getResp<T extends ApiResponse>(request: ApiRequest, callback: ApiCallback<T>, onError: () => void): void {
        this.load(request, callback, onError);
    }

    private makeUrl(request: ApiRequest): string {
        const url = new URL(request.endpoint, this.baseLink);

        if (request.options?.sources) {
            url.searchParams.set('sources', request.options.sources);
        }

        return url.toString();
    }

    private errorHandler(response: Response): Response {
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status} ${response.statusText}`);
        }

        return response;
    }

    private load<T extends ApiResponse>(request: ApiRequest, callback: ApiCallback<T>, onError: () => void): void {
        const headers: HeadersInit = __USE_API_MOCKS__ ? {} : { 'X-Api-Key': __NEWS_API_KEY__ };
        fetch(this.makeUrl(request), { method: RequestMethod.Get, headers })
            .then((response) => this.errorHandler(response))
            .then((response) => response.json() as Promise<T>)
            .then((data) => {
                if (data.status === ApiStatus.Error) {
                    throw new Error(data.message || 'The news service returned an error');
                }

                callback(data);
            })
            .catch((error: unknown) => {
                console.error(error);
                onError();
            });
    }
}

export default Loader;
