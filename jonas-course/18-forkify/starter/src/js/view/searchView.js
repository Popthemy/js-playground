

class SearchView {
  _parentEl = document.querySelector('form');
  _inputField = this._parentEl.querySelector('.search__field');

  getQuery() {
    const query = this._inputField.value.trim();
    this._clearInput();
    return query;
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  _clearInput() {
    this._inputField.value = '';
  }
}

export default new SearchView();
