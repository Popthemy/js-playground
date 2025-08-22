import 'core-js/stable'; // Polyfills for stable features
import 'regenerator-runtime/runtime'; // Polyfills for async/await
import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';
import bookmarksView from './view/bookmarksView.js';
import addRecipeView from './view/addRecipeView.js';

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const recipeID = window.location.hash.slice(1);
    if (!recipeID) return; // Exit if no recipe ID is found
    recipeView.renderSpinner();
    // console.log(recipeID)

    // update the resultsView by the search
    await model.loadRecipe(recipeID);

    resultsView.update(model.getSearchResultPage());

    bookmarksView.update(model.state.bookmarks);

    // 1) Loading recipe

    // 2. rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    // alert(`${err} 💥`);
    recipeView.renderErrorMsg();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) throw new Error('no query parameter');

    await model.loadSearchResults(query);
    // const data = model.state.search.results;
    resultsView.render(model.getSearchResultPage(1));

    paginationView.render(model.state.search);
  } catch (err) {
    // alert(`${err} 💥`);
    resultsView.renderErrorMsg(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings = 1) {
  model.updateServings(newServings);
  // console.log(model.state.recipe)

  // recipeView.render(model.state.recipe);
  /*
  for optimization we want to change 
  the only places the changes applies to.
   */
  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  const recipe = model.state.recipe;
  if (!recipe.bookmarked) {
    model.addBookMark(recipe);
  } else {
    model.removeBookMark(recipe.id);
  }
  // running bookmarks
  recipeView.update(recipe);

  // update the recipe view
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarkStorage = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try{

    // upload the new recipe
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    // console.log(model.state.recipe);

    // render recipe
    recipeView.render(model.state.recipe)

    // render upload success
    addRecipeView.renderMsg()

    // render bookmarks view
    bookmarksView.render(model.state.bookmarks);
    
    // history api used to manage history, it can be used to handle back
    window.history.pushState(null,'',`#${model.state.recipe.id}`)

    // close the upload form
    setTimeout(function(){
      addRecipeView.toggleWindow();
    },MODAL_CLOSE_SEC * 1000)

  } catch(err){
    // console.log(err)
    addRecipeView.renderErrorMsg(err)
  }
};


const welcome = () => {
  console.log('Welcome to Forkify!!!')
}

const init = () => {
  // load the bookmarked recipe into bookmark list freshly
  bookmarksView.addHandlerRender(controlBookmarkStorage);
  recipeView.addHandlerBookmark(controlBookmark);
  recipeView.addEventsRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);

  addRecipeView.addHandlerUpload(controlAddRecipe);
  welcome()
};

init();

// if (module.hot) {
//   module.hot.accept();
// }
