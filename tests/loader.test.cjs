const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

const source = fs.readFileSync('src/components/controller/loader.ts', 'utf8');
const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

async function checkLoader(useMocks) {
    const exports = {};
    let requestedUrl = '';
    let requestedHeaders = {};
    let shouldFail = false;
    const context = {
        exports,
        require: () => ({ ApiStatus: { Error: 'error' }, RequestMethod: { Get: 'GET' } }),
        __USE_API_MOCKS__: useMocks,
        __NEWS_API_KEY__: 'test-key',
        URL,
        console: { error: () => {} },
        fetch: async (url, options) => {
            requestedUrl = url;
            requestedHeaders = options.headers;
            return shouldFail
                ? { ok: false, status: 500, statusText: 'Error' }
                : { ok: true, json: async () => ({ status: 'ok', articles: [] }) };
        },
    };
    vm.runInNewContext(code, context);
    const loader = new exports.default('https://example.test/');
    let success = false;
    let failed = false;
    loader.getResp(
        { endpoint: 'everything', options: { sources: 'bbc & news' } },
        () => {
            success = true;
        },
        () => {
            failed = true;
        }
    );
    await new Promise((resolve) => setImmediate(resolve));
    const url = new URL(requestedUrl);
    assert.equal(url.searchParams.get('sources'), 'bbc & news');
    assert.equal(url.searchParams.get('apiKey'), null);
    assert.equal(requestedHeaders['X-Api-Key'], useMocks ? undefined : 'test-key');
    assert.equal(success, true);
    assert.equal(failed, false);

    shouldFail = true;
    loader.getResp(
        { endpoint: 'sources' },
        () => {
            throw Error('unexpected success');
        },
        () => {
            failed = true;
        }
    );
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal(failed, true);
}

function checkEmptyNews() {
    const newsSource = fs.readFileSync('src/components/view/news/news.ts', 'utf8');
    const newsCode = ts.transpileModule(newsSource, {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    }).outputText;
    const exports = {};
    const container = { textContent: '' };
    const document = {
        querySelector: (selector) => (selector === '#newsItemTemp' ? {} : container),
        createDocumentFragment: () => ({}),
    };
    vm.runInNewContext(newsCode, { exports, document, require: () => ({}) });
    new exports.default().draw([]);
    assert.equal(container.textContent, 'No stories were found for this source.');
}

(async () => {
    checkEmptyNews();
    await checkLoader(true);
    await checkLoader(false);
    console.log('Loader checks passed');
})().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
