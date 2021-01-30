class Section {
  constructor({items, renderer}, containerSel) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSel);
  }

  addItem(element) {
    this._renderer(element);
  }

  renderElements() {
    this._items.forEach(item => this._renderer(item));
  }
}