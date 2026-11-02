import Loader from './loader';

class AppLoader extends Loader {
    public constructor() {
        super('https://rss-news-api.onrender.com/');
    }
}

export default AppLoader;
