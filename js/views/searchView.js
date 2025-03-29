import View from './View.js'; // Importar la clase View

class SearchView extends View {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput(); // Limpiar el campo después de obtener el valor
    return query;
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = ''; // Limpiar el input
  }

  _generateMarkup() {
    // Este método podría usarse para generar los resultados de búsqueda
    return ''; // Este es solo un ejemplo, y debe ser sobrecargado en las clases hijas si es necesario
  }
}

export default new SearchView();