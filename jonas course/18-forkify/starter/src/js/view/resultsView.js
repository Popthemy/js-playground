import View from './view.js';
import previewView from './previewView.js';
import iconsUrl from 'url:../../img/icons.svg'; // Importing icons URL

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMsg = 'No results found for your query. Please try again!';

  _generateMarkUp() {
    return this._data.map( result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
