export default class Section {
  constructor({items, renderer}, containerSel) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSel);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderElements() {
    this._items.forEach(item => this._renderer(item));
  }
}