import { setAttributes } from './utils.js';

    const errorDOM = () => {
        const divError = document.createElement('div');
        divError.setAttribute("class", "error-page");
        const p = document.createElement('p');
        p.setAttribute("class", "error-page__text");
        p.textContent = 'L\'information que vous recherchez n\'est pas disponible.';
        const a = document.createElement('a');
        setAttributes(a, { "href": "/", "class": "error-page__link" });
        a.textContent = 'Retour à l\'accueil';
        divError.append(p, a);
        return ('divError', divError);
    }

export { errorDOM };