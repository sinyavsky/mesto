export default class Card {

  constructor(settings) {
    this._templateSelector = settings.templateSelector;
    this._cardSelector = settings.cardSelector;
    this._nameSelector = settings.nameSelector;
    this._pictureSelector = settings.pictureSelector;
    this._likeSelector = settings.likeSelector;
    this._removeSelector = settings.removeSelector;
    this._likeActiveClass = settings.likeActiveClass;

    this._id = settings.id;
    this._name = settings.name;
    this._pictureSrc = settings.pictureSrc;
    this._likesCounter = settings.likesCounter;
    this._isLiked = settings.isLiked;
    this._isOwner = settings.isOwner;

    this._handleCardClick = settings.handleCardClick;    
    this._handleLikeClick = settings.handleLikeClick;
    this._handleDeleteClick = settings.handleDeleteClick;
    
    this._cardElement = null; // элемент карточки
    this._cardLikes = null;   // элемент кнопки лайка
  }

  _toggleLike = () => {
    this._isLiked = !this._isLiked;
    this._cardLikes.classList.toggle(this._likeActiveClass);
    
    // лайк засчитываем сразу, чтобы пользователь не видел задержки
    // но когда придет ответ от сервера - установим обновленное значение
    if(this._isLiked) {
      this.updateLikesCounter(this._likesCounter+1);
    }
    else {
      this.updateLikesCounter(this._likesCounter-1);
    }
    return this._isLiked;
  }

  _createCardElement = () => {
    this._card = document.querySelector(this._templateSelector).content.cloneNode(true);  

    const cardName = this._card.querySelector(this._nameSelector);
    const cardPic = this._card.querySelector(this._pictureSelector);

    // длинные названия не поместятся, поэтому утанавливаем и title
    cardName.textContent = this._name;
    cardName.title = this._name;
  
    cardPic.src = this._pictureSrc;
    cardPic.alt = this._name;
    cardPic.title = this._name;

    this._cardLikes = this._card.querySelector(this._likeSelector); 
    if(this._isLiked) {
      this._cardLikes.classList.add(this._likeActiveClass);
    }      
    this.updateLikesCounter(this._likesCounter);
  
    if(!this._isOwner)  // значит удалять нельзя
      this._card.querySelector(this._removeSelector).remove();    
  }  

  _setEventListeners = () => {
    this._card.querySelector(this._pictureSelector).addEventListener('click', () => this._handleCardClick(this._name, this._pictureSrc));      
    this._card.querySelector(this._likeSelector).addEventListener('click', () => this._handleLikeClick(this, this._toggleLike()));
    
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

  createCard = () => {
    this._createCardElement();
    this._setEventListeners();        
    return this._card;  
  }

  removeCard = () => {
    this._cardElement.remove();
  }

  getCardId() {
    return this._id;
  }

  updateLikesCounter(amount) {
    this._likesCounter = amount;
    this._cardLikes.textContent = amount;
  }

}