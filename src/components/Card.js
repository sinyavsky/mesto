export default class Card {

  constructor(settings) {
    this._id = settings.id;
    this._name = settings.name;
    this._pictureSrc = settings.pictureSrc;
    this._likesCounter = settings.likesCounter;
    this._isLiked = settings.isLiked;
    this._templateSelector = settings.templateSelector;
    this._cardSelector = settings.cardSelector;
    this._nameSelector = settings.nameSelector;
    this._pictureSelector = settings.pictureSelector;
    this._likeSelector = settings.likeSelector;
    this._removeSelector = settings.removeSelector;
    this._likeActiveClass = settings.likeActiveClass;

    this._handleCardClick = settings.handleCardClick;    
    this._handleLikeClick = settings.handleLikeClick;
    this._handleDeleteClick = settings.handleDeleteClick;
  }

  _toggleLike = (evt) => {    
    return evt.target.classList.toggle(this._likeActiveClass);
  }

  removeCard = () => {
    this._cardElement.remove();
  }

  _createCardElement = (isOwner) => {
    this._card = document.querySelector(this._templateSelector).content.cloneNode(true);   
    const cardName = this._card.querySelector(this._nameSelector);
    const cardPic = this._card.querySelector(this._pictureSelector);
    this._cardLikes = this._card.querySelector(this._likeSelector); 
    if(this._isLiked)
      this._cardLikes.classList.add(this._likeActiveClass);
  
    if(!isOwner)  // значит удалять нельзя
      this._card.querySelector(this._removeSelector).remove();

    // длинные названия не поместятся, поэтому утанавливаем и title
    cardName.textContent = this._name;
    cardName.title = this._name;
  
    cardPic.src = this._pictureSrc;
    cardPic.alt = this._name;
    cardPic.title = this._name;

    this.updateLikesCounter(this._likesCounter);
  }  

  _setEventListeners = () => {
    this._card.querySelector(this._pictureSelector).addEventListener('click', () => this._handleCardClick(this._name, this._pictureSrc));      
    this._card.querySelector(this._likeSelector).addEventListener('click', (evt) => {
      this._handleLikeClick(this, this._toggleLike(evt));
    });
    
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

  getCardId() {
    return this._id;
  }

  updateLikesCounter(amount) {
    this._likesCounter = amount;
    this._cardLikes.textContent = amount;
  }

}