import type { NewsSourceCard } from '../../../types/news';
import './sources.css';

class Sources {
    public draw(data: NewsSourceCard[]): void {
        const template = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        const sourcesContainer = document.querySelector<HTMLElement>('.sources');

        if (!template || !sourcesContainer) {
            throw new Error('Source template or container was not found');
        }

        const fragment = document.createDocumentFragment();

        data.forEach((source) => {
            if (!source.id || !source.name) {
                return;
            }

            const sourceClone = template.content.cloneNode(true) as DocumentFragment;
            const sourceButton = sourceClone.querySelector<HTMLButtonElement>('.source__item');

            if (!sourceButton) {
                return;
            }

            sourceButton.dataset.sourceId = source.id;
            sourceButton.setAttribute('aria-pressed', 'false');
            sourceButton.querySelector('.source__item-name')!.textContent = source.name;
            fragment.append(sourceClone);
        });

        sourcesContainer.replaceChildren(fragment);
    }
}

export default Sources;
