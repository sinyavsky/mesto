export default class Card {

  constructor(settings) {
    this._id = settings.id;
    this._name = settings.name;
    this._pictureSrc = settings.pictureSrc;
    this._likes = settings.likes;
    this._templateSelector = settings.templateSelector;
    this._cardSelector = settings.cardSelector;
    this._nameSelector = settings.nameSelector;
    this._pictureSelector = settings.pictureSelector;
    this._likeSelector = settings.likeSelector;
    this._removeSelector = settings.removeSelector;
    this._likeActiveClass = settings.likeActiveClass;
    this._handleCardClick = settings.handleCardClick;    
    this._handleDeleteClick = settings.handleDeleteClick;
  }

  _toggleLike = (evt) => {
    evt.target.classList.toggle(this._likeActiveClass);
  }

  removeCard = () => {
    this._cardElement.remove();
  }

  _createCardElement = (isOwner) => {
    this._card = document.querySelector(this._templateSelector).content.cloneNode(true);   
    const cardName = this._card.querySelector(this._nameSelector);
    const cardPic = this._card.querySelector(this._pictureSelector);
    const cardLikes = this._card.querySelector(this._likeSelector);    
  
    if(!isOwner)  // значит удалять нельзя
      this._card.querySelector(this._removeSelector).remove();

    // длинные названия не поместятся, поэтому утанавливаем и title
    cardName.textContent = this._name;
    cardName.title = this._name;
  
    cardPic.src = this._pictureSrc;
    cardPic.alt = this._name;
    cardPic.title = this._name;

    cardLikes.textContent = this._likes;
  }  

  _setEventListeners = () => {
    this._card.querySelector(this._pictureSelector).addEventListener('click', () => this._handleCardClick(this._name, this._pictureSrc));  
    this._card.querySelector(this._likeSelector).addEventListener('click', this._toggleLike);
    
    // т.к. кнопка удаления есть не у всех карточек
    const removeButton = this._card.querySelector(this._removeSelector);
    if(removeButton)
    {
      removeButton.addEventListener('click', (evt) => {
        // этот элемент нам понадобится при вызове removeCard()
        this._cardElement = evt.target.closest(this._cardSelector);
        this._handleDeleteClick(this);
      });
    }    
  }

  createCard = (isOwner) => {
    this._createCardElement(isOwner);
    this._setEventListeners();    
    
    return this._card;  
  }

}