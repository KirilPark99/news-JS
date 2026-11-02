# Newsroom

A small news reader built with TypeScript, Webpack and the News API proxy.

## Run the app

1. Install the dependencies with `npm install`.
2. Start the development server with `npm start`.
3. Choose a source to see its latest stories.

The development build uses the proxy mock endpoints so it does not make real News API requests.

## Checks

-   `npm run typecheck` checks the TypeScript files.
-   `npm run lint` checks the TypeScript files with ESLint.
-   `npm test` checks URL parameters and request errors.
-   `npm run build` creates the production files in `dist`.

## Deploy to GitHub Pages

Run `npm run deploy` to build the app and publish the `dist` folder to the `gh-pages` branch. Then choose that branch as the GitHub Pages source in the repository settings.

By default, the production build uses sample data too. For live news, obtain a News API key and set the `NEWS_API_KEY` environment variable when building or deploying, for example:

```sh
NEWS_API_KEY=your_key npm run deploy
```

The production build uses the News API proxy at `https://rss-news-api.onrender.com/`. **The key is included in the public browser bundle and can be seen by anyone.** Use a key you are comfortable exposing, or use a private backend for secure storage.
