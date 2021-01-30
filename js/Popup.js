export default class Popup {
  constructor(popupSel) {
    this._popup = document.querySelector(popupSel);    
  }

  _handleEscClose() {
    if(evt.key === 'Escape')
      this.close();
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose.bind(this)); // мб будет работать без bind? надо будет проверить
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.classList.remove('popup_opened');
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if(evt.target.classList === this._popop || evt.target.classList.contains('popup__close'))
        this.close();
  }
}