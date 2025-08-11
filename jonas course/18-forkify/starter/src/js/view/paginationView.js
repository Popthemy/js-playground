import View from './view.js';
import iconsUrl from 'url:../../img/icons.svg'; // Importing icons URL

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler){
    this._parentEl.addEventListener('click', function(e){
      e.preventDefault();

      const btn = e.target.closest('.btn--inline');
      if (!btn) return; // Exit if no button is clicked
      handler(+btn.dataset.goto)
      
    }); 
  }

  _generateMarkUp() {
    const data = this._data;
    const curPage = data.page;
    const totalPage = Math.ceil(data.results.length / data.resultsPerPage);

    if (curPage === 1 && totalPage > 1) {
      return `
      <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${iconsUrl}#icon-arrow-right"></use>
            </svg>
      </button> 
      `;
    }

    if (totalPage === curPage && totalPage > 1) {
      return `
      <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${iconsUrl}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
      </button>
      `;
    }

    if (curPage < totalPage) {
      return `
      <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${iconsUrl}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
      </button>
      <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${iconsUrl}#icon-arrow-right"></use>
            </svg>
      </button> 
      `;
    }
  
    return; // when a single page just return

  }
}

export default new PaginationView();
