import Popup from "./Popup.js";


export default class PopupWithImage extends Popup {

  constructor(popupSel) {
    super(popupSel);

    this._picture = document.querySelector('.popup__picture');
    this._name = document.querySelector('.popup__picture-name');
  }

  open(name, link) {
    super.open();

    this._picture.src = link;
    this._picture.alt = name;
    this._name.textContent = name; 
  }
  
}