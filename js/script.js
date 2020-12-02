// стартовый набор карточек
const initialCards = [
  {
      name: 'Мост Золотые Ворота',
      link: 'images/most-zolotye-vorota.jpg'
  },
  {
      name: 'Карпатос',
      link: 'images/karpatos.jpg'
  },
  {
      name: 'Берлинский Кафедральный Собор',
      link: 'images/berlinskiy-kafedralnyy-sobor.jpg'
  },
  {
      name: 'Красная Площадь',
      link: 'images/krasnaya-ploshad.jpg'
  },
  {
      name: 'Джайпур',
      link: 'images/dzhaypur.jpg'
  },
  {
      name: 'Эйфелева Башня',
      link: 'images/eyfeleva-bashnya.jpg'
  }
]; 

// для регистрации событий
let profileEditButton = document.querySelector('.profile__edit');
let popupCloseButton = document.querySelector('.popup__close');
let popupForm = document.querySelector('.popup__form');

// для обращения внутри функций
let nameElement = document.querySelector('.profile__name');
let nameInput = document.querySelector('.popup__input_type_name');

let bioElement = document.querySelector('.profile__bio');
let bioInput = document.querySelector('.popup__input_type_bio');

let popup = document.querySelector('.popup');

let cardsContainer = document.querySelector('.cards__list');

function onPopupOpen() {  
  nameInput.value = nameElement.textContent;
  bioInput.value = bioElement.textContent;
  
  popup.classList.add('popup_opened');
}

function onPopupClose() {
  popup.classList.remove('popup_opened');
}

function onPopupFormSubmit(e) {
  e.preventDefault();

  nameElement.textContent = nameInput.value;  
  bioElement.textContent = bioInput.value;

  onPopupClose();
}

function loadInitialCards() {  
  const cardTemplate = document.querySelector('.card-template').content;

  initialCards.forEach((item) => {
      const newCard = cardTemplate.cloneNode(true);
      const newCardPic = newCard.querySelector('.card__picture');
      const newCardName = newCard.querySelector('.card__name');

      // длинные названия не поместятся, поэтому утанавливаем и title
      newCardName.textContent = item.name;
      newCardName.title = item.name;

      newCardPic.src = item.link;
      newCardPic.alt = item.name;
      newCardPic.title = item.name;
      
      cardsContainer.append(newCard);
    });
}

document.addEventListener('DOMContentLoaded',loadInitialCards);

profileEditButton.addEventListener('click',onPopupOpen);
popupCloseButton.addEventListener('click',onPopupClose);
popupForm.addEventListener('submit',onPopupFormSubmit);