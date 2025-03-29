import View from './View';
import icons from '../../img/icons.svg';

class RecipeView extends View {
    _errorMessage = `We could not find that recipe. Please try another one!`;

    constructor(parentElement) {
        super(parentElement); // Llamar al constructor de la clase base (View)
    }

    _generateMarkup() {
        return `
          <figure class="recipe__fig">
            <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img"/>
            <h1 class="recipe__title">
                <span>${this._data.title}</span>
            </h1>
          </figure>

          <div class="recipe__details">
              <div class="recipe__info">
                  <svg class="recipe__info-icon">
                  <use href="${icons}#icon-clock"></use>
                  </svg>
                  <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookTime}</span>
                  <span class="recipe__info-text">minutes</span>
              </div>
              <div class="recipe__info">
                  <svg class="recipe__info-icon">
                  <use href="${icons}#icon-users"></use>
                  </svg>
                  <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
                  <span class="recipe__info-text">servings</span>
              </div>
          </div>

          <div class="recipe__ingredients">
              <h2 class="heading--2">Recipe ingredients</h2>
              <ul class="recipe__ingredient-list">
                  ${this._data.ingredients.map(ing => `
                  <li class="recipe__ingredient">
                      <svg class="recipe__icon">
                      <use href="${icons}#icon-check"></use>
                      </svg>
                      <div class="recipe__quantity">${this._formatQuantity(ing.quantity)}</div>
                      <div class="recipe__description">
                      <span class="recipe__unit">${ing.unit || ''}</span>
                      ${ing.description || ''}
                      </div>
                  </li>
                  `).join('')}
              </ul>
          </div>

          <div class="recipe__directions">
              <h2 class="heading--2">How to cook it</h2>
              <p class="recipe__directions-text">
                  This recipe was carefully designed and tested by
                  <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
                  directions at their website.
              </p>
              <a class="btn--small recipe__btn" href="${this._data.sourceUrl}" target="_blank">
                  <span>Directions</span>
                  <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                  </svg>
              </a>
          </div>`;
    }

    _formatQuantity(quantity) {
        if (!quantity) return ''; // Si no hay cantidad, devolver vacío
        return this._convertToFraction(quantity); // Convertir a fracción
    }

    _convertToFraction(number) {
        if (number % 1 === 0) return number.toString(); // Si el número es entero, retornarlo tal cual
        const fraction = this._decimalToFraction(number); // Si no, convertir a fracción
        return `${fraction[0]}/${fraction[1]}`;
    }

    _decimalToFraction(decimal) {
        const denominator = 1000; // Usamos 1000 como denominador para obtener fracciones más precisas
        const numerator = Math.round(decimal * denominator);
        const gcd = this._greatestCommonDivisor(numerator, denominator);
        return [numerator / gcd, denominator / gcd]; // Simplificamos la fracción
    }

    _greatestCommonDivisor(a, b) {
        while (b) {
            const t = b;
            b = a % b;
            a = t;
        }
        return a;
    }
}

export default RecipeView;