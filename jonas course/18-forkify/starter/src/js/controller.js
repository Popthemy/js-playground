import 'core-js/stable'; // Polyfills for stable features
import 'regenerator-runtime/runtime'; // Polyfills for async/await
import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    recipeView.renderSpinner();

    const recipeID = window.location.hash.slice(1);
    if (!recipeID) return; // Exit if no recipe ID is found
    // console.log(recipeID)

    // 1) Loading recipe
    await model.loadRecipe(recipeID);
    const { recipe } = model.state;

    // 2. rendering recipe
    recipeView.render(model.state.recipe);
    controlServings(4);
  } catch (err) {
    // alert(`${err} 💥`);
    recipeView.renderErrorMsg();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return; //throw new Error('no query parameter')

    await model.loadSearchResults(query);

    // const data = model.state.search.results;
    resultsView.render(model.getSearchResultPage(1));

    paginationView.render(model.state.search);

  } catch (err) {
    // alert(`${err} 💥`);
    resultsView.renderErrorMsg(err);
  }
};

const controlPagination = function(goToPage){
  resultsView.render(model.getSearchResultPage(goToPage));
  paginationView.render(model.state.search);
}

const controlServings = function(newServings = 1){
  console.log(model.state.recipe)
  model.updateServings(newServings)
  console.log(model.state.recipe)

  recipeView.render(model.state.recipe);

}

const init = () => {
  recipeView.addEventsRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination)

};

init();

// if (module.hot) {
//   module.hot.accept();
// }
