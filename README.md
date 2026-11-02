# Newsroom

A small news reader built with TypeScript, Webpack and the News API proxy.

## Run the app

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and add your News API key.
3. Start the development server with `npm start`.
4. Choose a source to see its latest stories.

Without a key the app uses sample data. To use sample data with a key, set `USE_API_MOCKS=true` in `.env`.

## Checks

-   `npm run typecheck` checks the TypeScript files.
-   `npm run lint` checks the TypeScript files with ESLint.
-   `npm test` checks request handling and empty results.
-   `npm run build` creates the production files in `dist`.

## Deploy to GitHub Pages

Run `npm run deploy` to build the app and publish the `dist` folder to the `gh-pages` branch. Then choose that branch as the GitHub Pages source in the repository settings.

The build reads the key from `.env` or the `NEWS_API_KEY` environment variable. The app uses the News API proxy at `https://rss-news-api.onrender.com/`.

**The key is included in the public browser bundle and can be seen by anyone.** Use a key you are comfortable exposing, or use a private backend for secure storage. Never commit `.env`.
