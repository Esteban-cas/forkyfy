import View from './View';

class ResultView extends View {
    constructor() {
        super(document.querySelector('.results')); // El elemento con la clase 'results'
    }

    _generateMarkup() {
        return this._data.map(this._generateMarkupPreview).join('');
    }

    // Método para generar el preview de cada resultado
    _generateMarkupPreview(result) {
        return `
            <li class="preview">
                <a class="preview__link" href="#${result.id}">
                    <figure class="preview__fig">
                        <img src="${result.image}" alt="${result.title}" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${result.title}</h4>
                    </div>
                </a>
            </li>
        `;
    }
}

export default new ResultView();