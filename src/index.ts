import App from './components/app/app';
import './global.css';

const app = new App();
app.start();

const demoNotice = document.querySelector<HTMLElement>('.demo-notice');
if (demoNotice && __USE_API_MOCKS__) {
    demoNotice.hidden = false;
}
