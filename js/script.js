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


// переменные для редактирования профиля

const profileEditButton = document.querySelector('.profile__edit');
const profilePopup = document.querySelector('.popup_type_profile');
const profileForm = document.querySelector('.popup__form_type_profile');
const profilePopupCloseButton = document.querySelector('.popup__close_type_profile');

const profileNameElement = document.querySelector('.profile__name');
const profileNameInput = document.querySelector('.popup__input_type_name');

const profileBioElement = document.querySelector('.profile__bio');
const profileBioInput = document.querySelector('.popup__input_type_bio');


// переменные для карточек

let cardsContainer = document.querySelector('.cards__list');


// функции для профиля

function openProfilePopup() {  
  profileNameInput.value = profileNameElement.textContent;
  profileBioInput.value = profileBioElement.textContent;
  
  profilePopup.classList.add('popup_opened');
}

function closeProfilePopup() {
  profilePopup.classList.remove('popup_opened');
}

function submitProfileForm(e) {
  e.preventDefault();

  profileNameElement.textContent = profileNameInput.value;  
  profileBioElement.textContent = profileBioInput.value;

  closeProfilePopup();
}


// функции для карточек

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


// привязка к событиям

document.addEventListener('DOMContentLoaded',loadInitialCards);

profileEditButton.addEventListener('click',openProfilePopup);
profilePopupCloseButton.addEventListener('click',closeProfilePopup);
profileForm.addEventListener('submit',submitProfileForm);