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


// объекты для редактирования профиля

const profileEditButton = document.querySelector('.profile__edit');
const profilePopup = document.querySelector('.popup_type_profile');
const profileForm = document.querySelector('.popup__form_type_profile');
const profilePopupCloseButton = document.querySelector('.popup__close_type_profile');

const profileNameElement = document.querySelector('.profile__name');
const profileNameInput = document.querySelector('.popup__input_type_name');

const profileBioElement = document.querySelector('.profile__bio');
const profileBioInput = document.querySelector('.popup__input_type_bio');


// объекты для добавления карточек

const placeAddButton = document.querySelector('.profile__add');
const placePopup = document.querySelector('.popup_type_place');
const placeForm = document.querySelector('.popup__form_type_place');
const placePopupCloseButton = document.querySelector('.popup__close_type_place');

const placeNameInput = document.querySelector('.popup__input_type_place-name');
const placePicInput = document.querySelector('.popup__input_type_place-pic');

const cardsList = document.querySelector('.cards__list');


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


// функции для добавления карточек

function addNewCard(name, link) {
  const cardTemplate = document.querySelector('.card-template').content;

  const newCard = cardTemplate.cloneNode(true);  
  const newCardName = newCard.querySelector('.card__name');
  const newCardPic = newCard.querySelector('.card__picture');

  // длинные названия не поместятся, поэтому утанавливаем и title
  newCardName.textContent = name;
  newCardName.title = name;

  newCardPic.src = link;
  newCardPic.alt = name;
  newCardPic.title = name;
      
  bindCardEvents(newCard);
  cardsList.append(newCard);
  
}

function openPlacePopup() {      
  placePopup.classList.add('popup_opened');
}

function closePlacePopup() {
  placePopup.classList.remove('popup_opened');
}

function submitPlaceForm(e) {
  e.preventDefault();  
  addNewCard(placeNameInput.value,placePicInput.value);

  placeNameInput.value = '';
  placePicInput.value = '';
  
  closePlacePopup();
}


// функции для изменения состояния карточек

function bindCardEvents(card) {
  card.querySelector('.card__like').addEventListener('click',toggleLike);
  card.querySelector('.card__remove').addEventListener('click',removeCard)
}

function toggleLike(evt) {
  evt.target.classList.toggle('card__like_active');
}

function removeCard(evt) {
  evt.target.closest('.card-list__item').remove();
}


// привязка к событиям

document.addEventListener('DOMContentLoaded',() => {  
  initialCards.forEach((item) => {
      addNewCard(item.name,item.link);      
    });
});

profileEditButton.addEventListener('click',openProfilePopup);
profilePopupCloseButton.addEventListener('click',closeProfilePopup);
profileForm.addEventListener('submit',submitProfileForm);

placeAddButton.addEventListener('click',openPlacePopup);
placePopupCloseButton.addEventListener('click',closePlacePopup);
placeForm.addEventListener('submit',submitPlaceForm);

