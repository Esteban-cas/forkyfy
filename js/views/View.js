import icons from '../../img/icons.svg'; // Importar los iconos

class View {
    constructor(parentElement) {
        this._parentElement = parentElement;
    }
    
    addHandlerRender(handler) {
        const events = ['hashchange', 'load'];

        events.forEach((ev) => {
            window.addEventListener(ev, (e) => handler(e));
        });
    }

  _clear() {
    this._parentElement.innerHTML = ''; // Limpiar el parentElement
  }

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    this._clear();
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    this._clear();
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = 'Something went wrong!') {
    this._clear();
    const markup = `
      <div class="error">
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
        <p>${message}</p>
      </div>
    `;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = 'Success!') {
    this._clear();
    const markup = `
      <div class="message">
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
        <p>${message}</p>
      </div>
    `;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return ''; // Este método se debe sobrecargar en las clases hijas
  }
}

export default View;