import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage : RES_PER_PAGE
  },
};

export const loadSearchResults = async (query) => {
  try {
    state.search.results = query 
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

    return state.search.results;
  } catch (err) {
    console.log(`${err} 💥💥💥💥`);
  }
}

// Función para cargar la receta desde la API
export const loadRecipe = async (id) => {
  try {
    if (!id || typeof id !== 'string') throw new Error('No se proporcionó un ID válido');
    
    const data = await getJSON(`${API_URL}${id}`);
    console.log(data); 

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log('Receta cargada:', state.recipe);
  } catch (err) {
    console.log(`${err} 💥💥💥💥`); 
    throw err;
  }
};

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;

  const start = (page -1)*state.search.resultsPerPage
  const end = start + state.search.resultsPerPage;

  return state.search.results.slice(start, end);
}