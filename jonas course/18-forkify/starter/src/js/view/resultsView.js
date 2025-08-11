import View from './view.js';
import iconsUrl from 'url:../../img/icons.svg'; // Importing icons URL

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMsg = 'No results found for your query. Please try again!';

  _generateMarkUp() {
    return this._data
      .map(recipe => {
        return `
        <li class="preview">
          <a class="preview__link" href="#${recipe.id}">
            <figure class="preview__fig">
              <img src="${recipe.image}" alt="${recipe.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${recipe.title}</h4>
              <p class="preview__publisher">${recipe.publisher}</p>
              ${
                recipe.user
                  ? ` <div class="preview__user-generated">
                <svg>
                  <use href="${iconsUrl}#icon-user"></use>
                </svg>
              </div>`
                  : ''
              }
             
            </div>
          </a>
        </li>
      `;
      })
      .join('');
  }
}

export default new ResultsView();
