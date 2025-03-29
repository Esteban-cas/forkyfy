import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Importa los iconos

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.pagination__btn'); 
      if (!btn) return; 

      const goToPage = Number(btn.dataset.goto); 
      console.log(goToPage); // Registro en la consola

      handler(goToPage); 
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    if (curPage === 1 && numPages > 1) {
      return this._generateNextButton(curPage);
    }

    if (curPage === numPages && numPages > 1) {
      return this._generatePrevButton(curPage);
    }

    if (curPage < numPages) {
      return this._generatePrevButton(curPage) + this._generateNextButton(curPage);
    }

    return '';
  }

  _generateNextButton(curPage) {
    return `
      <button class="pagination__btn pagination__btn--next" data-goto="${curPage + 1}">
        <span>Página ${curPage + 1}</span>
        <svg class="pagination__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  _generatePrevButton(curPage) {
    return `
      <button class="pagination__btn pagination__btn--prev" data-goto="${curPage - 1}">
        <svg class="pagination__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Página ${curPage - 1}</span>
      </button>
    `;
  }
}

export default new PaginationView();