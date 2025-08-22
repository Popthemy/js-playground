import View from './view.js';
import iconsUrl from 'url:../../img/icons.svg'; // Importing icons URL

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _ingredient_counter = 1;
  _errorMsg = 'Recipe not uploaded';
  _msg = 'Recipe uploaded successfully';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _ingredientContainer = document.querySelector('.upload__ingredients');


  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    this._addHandlerChangeIngredientFields();
  }

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();
      if (!e.target.closest('.upload__btn')) return;
      // the FormData gives takes a form and gives the value of the input
      const dataArr = [...new FormData(this)];
      // to convert entries to object use Object.fromEntries
      handler(Object.fromEntries(dataArr));
    });
  }

  _refreshIngredientsField(add = true) {
    const ingredientItems = this._ingredientContainer.querySelectorAll('.ingredient__details')

    if (add) {
      ingredientItems.forEach(item=>{
        item.querySelector('.add')?.classList.add('hidden')
        item.querySelector('.remove')?.classList.add('hidden')
      })
    } else{
      const lastItem = this._ingredientContainer.lastElementChild;
      lastItem.querySelector('.add')?.classList.remove('hidden');
      
      if(this._ingredient_counter >1){
        lastItem.querySelector('.remove')?.classList.remove('hidden');
      }
    }
  }

  _addHandlerChangeIngredientFields() {
    this._parentEl.addEventListener(
      'click',
      this._addIngredientField.bind(this)
    );
  }

  _addIngredientField(e) {
    const removeBtn = e.target.closest('.remove');
    const addBtn = e.target.closest('.add');

    if (!(removeBtn || addBtn)) return;
    const prev_counter = this._ingredient_counter;

    if (addBtn) {
      if (this._ingredient_counter >= 10) return this._errorMsg(`You can't add more than 10 ingredients for a recipe`);
      this._ingredient_counter++;
      console.log(prev_counter, this._ingredient_counter);
      this._refreshIngredientsField(); // clear remove and add btn on the prev fields
      this.renderNewIngredientField();
  
    } else {
      if (this._ingredient_counter <= 1) return this._errorMsg(`You can't go less than a field`);;
      this._ingredient_counter++;
      // delete the node of that dataset
      const removeTarget = e.target.closest('.ingredient__details');
      removeTarget?.remove();
      this._refreshIngredientsField(false); // clear remove and add btn on the prev fields
    }
  }

  renderNewIngredientField() {
    const markup = this._generateIngredientFieldMarkUp(
      this._ingredient_counter
    );
    this._ingredientContainer.insertAdjacentHTML('beforeend', markup);
    this._focusOnLastIngredient()
  }

  _generateIngredientFieldMarkUp(counter) {
    return `
    <div class="ingredient__details" data-ingredient-count="${counter}">
        <div class="ingredient__count"> Ingredient ${counter} <p class="ingredient__field"> <span class='remove'> - </span> <span class='add'> + </span></p></div>
      <div>
        <h3>Quantity</h3>
        <input value="0.5" type="text" required name="quantity${counter}" placeholder="Enter the quantity"/>
      </div>
      <div>
        <h3>Unit</h3>
        <input value="kg" type="text" required name="unit${counter}" placeholder="Enter the unit in kg"/>
      </div>
      <div>
        <h3>Description</h3>
        <input value="Rice" type="text" required name="description${counter}" placeholder="Enter the description"/>
      </div>
    </div>
    `;
  }

  _focusOnLastIngredient(){
    this._ingredientContainer.lastElementChild.scrollIntoView({behavior:'smooth'})
  }

  _generateMarkUp() {}
}

export default new AddRecipeView();
