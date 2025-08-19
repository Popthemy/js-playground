import { API_URL, RES_PER_PAGE, API_KEY } from './config.js';
import { AJAX } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};


const createdRecipeObject = function(data){
  let { recipe } = data.data;
  return {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image_url,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      cookingTime: recipe.cooking_time,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      ...(recipe.key && {key:recipe.key})
    };
}

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`);
    state.recipe = createdRecipeObject(data)

    if (state.bookmarks.some(bookmark => bookmark.id == id)) {
      state.recipe.bookmarked = true;
    }
    // console.log(recipe);
  } catch (err) {
    // console.error(`${err}❌❌`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image_url,
        publisher: recipe.publisher,
        ...(recipe.key && {key:recipe.key})
      };
    });
    // console.log(state.search.results);
  } catch (err) {
    // console.error(`${err}❌❌`);
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingr => {
    ingr.quantity = (ingr.quantity / state.recipe.servings) * newServings;
  });

  state.recipe.servings = newServings;
};

const persistBookmarksInLocalStorage = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookMark = function (recipe) {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarksInLocalStorage();
};

export const removeBookMark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id); // const index = state.bookmarks.findIndex(el => el.id === recipe.id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarksInLocalStorage();
};

export const uploadRecipe = async function (newRecipe) {
  try {
    console.log(newRecipe)
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ingr => {
        const ingrArr = ingr[1].split(',').map(ing => ing.trim());
 
        if (ingrArr.length !== 3) {
          throw new Error('Wrong format,! Please use the correct format');
        }
        const [quantity, unit, description] = ingrArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceUrl,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients
    };
    const data = await AJAX(`${API_URL}?key=${API_KEY}`,recipe)
    const structuredRecipe = createdRecipeObject(data);
    state.recipe = structuredRecipe;
    addBookMark(structuredRecipe);

  } catch (err) {
    console.log(err)
    throw err;
  }
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks()
