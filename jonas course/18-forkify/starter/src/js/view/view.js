import iconsUrl from 'url:../../img/icons.svg'; // Importing icons URL

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMsg();

    this._data = data;
    const markup = this._generateMarkUp();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentEl.innerHTML = ''; // Clear previous content
  }

  renderSpinner() {
    const markup = ` 
    <div class="spinner">
      <svg>
        <use href="${iconsUrl}#icon-loader"></use>
      </svg>
    </div>
  `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }


  renderErrorMsg(message = this._errorMsg) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${iconsUrl}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>;
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}

