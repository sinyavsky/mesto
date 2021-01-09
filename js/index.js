import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

// все модальные окна

const popups = document.querySelectorAll('.popup');

// объекты для редактирования профиля

const profileEditButton = document.querySelector('.profile__edit');
const profilePopup = document.querySelector('.popup_type_profile');
const profileForm = document.querySelector('.popup__form_type_profile');

const profileNameElement = document.querySelector('.profile__name');
const profileNameInput = document.querySelector('.popup__input_type_name');

const profileBioElement = document.querySelector('.profile__bio');
const profileBioInput = document.querySelector('.popup__input_type_bio');
const profileSubmitButton = document.querySelector('.popup__submit_type_profile');

// объекты для добавления карточек

const placeAddButton = document.querySelector('.profile__add');
const placePopup = document.querySelector('.popup_type_place');
const placeForm = document.querySelector('.popup__form_type_place');

const placeNameInput = document.querySelector('.popup__input_type_place-name');
const placePicInput = document.querySelector('.popup__input_type_place-pic');
const placeSubmitButton = document.querySelector('.popup__submit_type_place');

const cardsList = document.querySelector('.cards__list');

// объекты для увеличения картинок

const picturePopup = document.querySelector('.popup_type_picture');

const popupPictureImg = document.querySelector('.popup__picture');
const popupPictureName = document.querySelector('.popup__picture-name');


// общие функции модальных окон

function listenEscapeKey(evt) {
  if(evt.key === 'Escape')
    closePopup();
}

function openPopup(popup) {
  document.addEventListener('keydown', listenEscapeKey);
  popup.classList.add('popup_opened');
}

function closePopup() {  
  const currentPopup = document.querySelector('.popup_opened');
  document.removeEventListener('keydown', listenEscapeKey);
  currentPopup.classList.remove('popup_opened');
}


// функции для профиля

function prepareProfileForm() {
  profileNameInput.value = profileNameElement.textContent;
  profileBioInput.value = profileBioElement.textContent; 

  // событие input не срабатывает при программном изменении поля, а кнопка должна стать активной
  profileSubmitButton.disabled = false;
  profileSubmitButton.classList.remove('popup__submit_disabled');

  // если мы удалили значения инпутов и закрыли поле,
  // то при повторном открытии будут отображаться ошибки  
  // поэтому скрываем ошибки
  const errorsElements = Array.from(profileForm.querySelectorAll('.popup__error'));
  errorsElements.forEach((errorItem) => {
    errorItem.classList.remove('popup__error_visible');
  });

  // и убираем классы ошибок у инпутов
  const inputElements = Array.from(profileForm.querySelectorAll('.popup__input'));
  inputElements.forEach((inputItem) => {
    inputItem.classList.remove('popup__input_type_error');
  });
}

function openProfilePopup() {  
  prepareProfileForm(); 
  openPopup(profilePopup);
}

function submitProfileForm(e) {
  profileNameElement.textContent = profileNameInput.value;  
  profileBioElement.textContent = profileBioInput.value;

  closePopup();
}


// функции для взаимодействия с карточками

function addCard(name, pictureSrc) {
  const card = new Card({
    name: name, 
    pictureSrc: pictureSrc,
    templateSelector: '.card-template',
    cardSelector: '.card-list__item',
    nameSelector: '.card__name',
    pictureSelector: '.card__picture',
    likeSelector: '.card__like',
    removeSelector: '.card__remove',    
    likeActiveClass: 'card__like_active',    
    popupHandler: openPicturePopup
  });  
  cardsList.prepend(card.createCard());
}

function submitPlaceForm(e) {
  addCard(placeNameInput.value, placePicInput.value);
  placeForm.reset();
  // поля очистили, теперь надо обновить статус кнопки 
  placeSubmitButton.disabled = false;
  placeSubmitButton.classList.add('popup__submit_disabled');
  closePopup();
}


// функции для увеличения картинок

function openPicturePopup(evt) {
  const name = evt.target.nextElementSibling.children[0].textContent;

  popupPictureImg.src = evt.target.src;
  popupPictureImg.alt = name;
  popupPictureName.textContent = name; 

  openPopup(picturePopup);  
}


// привязка к событиям

document.addEventListener('DOMContentLoaded',() => {  
  initialCards.forEach((item) => {
    addCard(item.name, item.link); 
    });
});

profileEditButton.addEventListener('click',openProfilePopup);

profileForm.addEventListener('submit',submitProfileForm);

placeAddButton.addEventListener('click',() => {
  openPopup(placePopup);
});

placeForm.addEventListener('submit',submitPlaceForm);

popups.forEach((item) => {
  item.addEventListener('click', function (evt) {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close'))
      closePopup();
  });
});


// инициализация валидации

document.querySelectorAll('.popup__form').forEach((formElement) => {
  const formValidator = new FormValidator({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  },
  formElement);
  formValidator.enableValidation();
});