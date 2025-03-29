import * as model from './model.js'; 
import RecipeView from './views/RecipeView.js';
import SearchView from './views/searchView.js';
import ResultView from './views/ResultView.js';
import PaginationView from './views/paginationView.js';

async function controlRecipes() {
  try {
    const parentEl = document.querySelector('.recipe');
    const recipeView = new RecipeView(parentEl);
    recipeView.renderSpinner();

    const id = window.location.hash.slice(1); // Obtener el ID de la receta del hash
    if (!id) return; // Si no hay hash, salir de la función

    await model.loadRecipe(id);
    recipeView.render(model.state.recipe); 

  } catch (error) {
    RecipeView.renderError();
    throw error;
  }
}

const controlSearchResults = async function () {
  // Obtenemos la consulta del input de búsqueda
  const query = SearchView.getQuery();
  if (!query) return; // Si no hay consulta, no se continúa

  try {
    ResultView.renderSpinner();

    await model.loadSearchResults(query); // Se cargan los resultados en el modelo

    ResultView.render(model.getSearchResultsPage()); // Renderizar la primera página de resultados
    PaginationView.render(model.state.search); // Renderizar botones de paginación

    console.log('Resultados de búsqueda:', model.state.search.results);
  } catch (err) {
    console.error('Error al cargar resultados:', err);
  }
};

const controlPagination = function (goToPage) {
  model.state.search.page = goToPage; // Actualizar el número de página
  ResultView.render(model.getSearchResultsPage(goToPage)); // Renderizar los resultados de la nueva página
  PaginationView.render(model.state.search); // Actualizar la paginación
};

function init() {
  const recipeView = new RecipeView(document.querySelector('.recipe'));
  recipeView.addHandlerRender(controlRecipes);  

  // Usar la instancia searchView para llamar a addHandlerSearch
  SearchView.addHandlerSearch(controlSearchResults); 
  PaginationView.addHandlerClick(controlPagination); // Maneja la paginación 
}

init();