export enum ApiStatus {
    Ok = 'ok',
    Error = 'error',
}

export enum RequestMethod {
    Get = 'GET',
}

export interface NewsSource {
    id: string | null;
    name: string | null;
    description?: string | null;
}

export type NewsSourceCard = Pick<NewsSource, 'id' | 'name'>;

export interface NewsArticle {
    source: NewsSourceCard;
    author: string | null;
    title: string | null;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string | null;
}

export interface ApiResponseBase {
    status: ApiStatus;
    message?: string;
}

export interface SourcesResponse extends ApiResponseBase {
    sources: NewsSource[];
}

export interface NewsResponse extends ApiResponseBase {
    totalResults: number;
    articles: NewsArticle[];
}

export type ApiResponse = SourcesResponse | NewsResponse;
export type ApiEndpoint = 'sources' | 'everything' | 'mocks/sources' | 'mocks/everything';
export type RequestOptions = Readonly<Partial<{ sources: string }>>;
export type ApiCallback<T extends ApiResponse> = (data: T) => void;

export interface ApiRequest {
    endpoint: ApiEndpoint;
    options?: RequestOptions;
}
