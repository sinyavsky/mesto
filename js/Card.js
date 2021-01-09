export default class Card {

  constructor(settings) {
    this._name = settings.name;
    this._pictureSrc = settings.pictureSrc;
    this._templateSelector = settings.templateSelector;
    this._cardSelector = settings.cardSelector;
    this._nameSelector = settings.nameSelector;
    this._pictureSelector = settings.pictureSelector;
    this._likeSelector = settings.likeSelector;
    this._removeSelector = settings.removeSelector;
    this._likeActiveClass = settings.likeActiveClass;
    this._popupHandler = settings.popupHandler;    
  }

  _toggleLike = (evt) => {
    evt.target.classList.toggle(this._likeActiveClass);
  }

  _removeCard = (evt) => {
    evt.target.closest(this._cardSelector).remove();
  }

  _createCardElement = () => {
    this._card = document.querySelector(this._templateSelector).content.cloneNode(true);   
    const newCardName = this._card.querySelector(this._nameSelector);
    const newCardPic = this._card.querySelector(this._pictureSelector);
  
    // длинные названия не поместятся, поэтому утанавливаем и title
    newCardName.textContent = this._name;
    newCardName.title = this._name;
  
    newCardPic.src = this._pictureSrc;
    newCardPic.alt = this._name;
    newCardPic.title = this._name;
  }  

  _setEventListeners = () => {
    const newCardPic = this._card.querySelector(this._pictureSelector);

    newCardPic.addEventListener('click', this._popupHandler);
  
    this._card.querySelector(this._likeSelector).addEventListener('click', this._toggleLike);
    this._card.querySelector(this._removeSelector).addEventListener('click', this._removeCard)
  }

  createCard = () => {
    this._createCardElement();
    this._setEventListeners();    
    
    return this._card;  
  }

}