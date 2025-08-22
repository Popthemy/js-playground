import iconsUrl from 'url:../../img/icons.svg'; // Importing icons URL

export default class View {
  _data;

  /**
   * Render object to the DOM | return markup as string
   * @param {Object | Object[]} data - The recipe or list of recipe to be rendered to the DOM 
  * @param {Boolean} [render=true] - if false it returns a markup string instead of rendering to the DOM
   * @returns {undefined} view instance
   * @ author Themy
   *TODO: Finish the implementation
   */
  render(data,render=true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMsg();

    this._data = data;
    const markup = this._generateMarkUp();

    if (!render)return markup;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    /*
    Compare the new markup to the old markup 
    and only update the part that has changed.
    to check if a node is equal us isEqualNode
     */
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMsg();

    this._data = data;
    const newMarkup = this._generateMarkUp();
    // create a virtual dom in memory to compare the new dom with the old elem
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));


    newElements.forEach((newEl,i) =>{
      const curEl = curElements[i];

      // different element: !curEl.isEqualNode(newEl)
      // where the element contains only text we don't want to change the element with just text
      if (!newEl.isEqualNode(curEl)) {
        if (newEl.firstChild?.nodeValue.trim() !== '') {
          // set text
          // console.log(curEl,newEl)
          curEl.textContent = newEl.textContent;
        }

        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value)
        })
      }
    })

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

  renderMsg(message = this._msg) {
    const markup = `
    <div class="message">
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

