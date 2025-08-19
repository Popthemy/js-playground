import View from './view.js';
import iconsUrl from 'url:../../img/icons.svg'; // Importing icons URL

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _msg = 'Recipe uploaded successfully';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
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
      // return data;
    });
  }

  _generateMarkUp() {}
} 

export default new AddRecipeView();
