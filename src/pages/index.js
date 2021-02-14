import './index.css';

import {
  initialCards,
  validationConfig,
  userNameInput,
  userBioInput
} from '../utils/constants.js';

import {
  createCard,
  handleApiError
} from '../utils/functions.js';

import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: '8c32355f-4347-4868-8ec7-20db7d4995bd',
    'Content-Type': 'application/json'
  }
}); 

// информация о пользователе
const user = new UserInfo({
  nameSel: '.profile__name',
  bioSel: '.profile__bio',
  avaSel: '.profile__ava'
});

api.getUserInfo(
  result => user.setUserInfo({
    name: result.name,
    bio: result.about,
    ava: result.avatar        
  }),
  error => handleApiError(error)
);

// включаем валидацию всем формам
const profileValidator = new FormValidator(validationConfig, document.querySelector('.popup__form_type_profile'));
profileValidator.enableValidation();

const addPlaceValidator = new FormValidator(validationConfig, document.querySelector('.popup__form_type_place'));
addPlaceValidator.enableValidation();


// рендер карточек
const cardsList = new Section({
  items: initialCards, 
  renderer: item => cardsList.addItem(
    createCard({
      name: item.name, 
      pictureSrc: item.link,         
      handleCardClick: popupWithImage.open.bind(popupWithImage)
    })
  )
}, '.cards__list');

document.addEventListener('DOMContentLoaded', () => cardsList.renderElements());


// попап для увеличения картинок
const popupWithImage = new PopupWithImage('.popup_type_picture');
popupWithImage.setEventListeners();


// попап с формой добавления карточек
const popupWithPlaceForm = new PopupWithForm('.popup_type_place', formData => {
  cardsList.addItem(
    createCard({
      name: formData.place_name, 
      pictureSrc: formData.place_pic,       
      handleCardClick: popupWithImage.open.bind(popupWithImage)
    })
  );    
  popupWithPlaceForm.close();
  addPlaceValidator.resetValidation();
});

popupWithPlaceForm.setEventListeners();


// попап для редактирования инфы о пользователе
const popupWithProfileForm = new PopupWithForm('.popup_type_profile', formData => {
  user.setUserInfo({name: formData.user_name, bio: formData.user_bio});  
  popupWithProfileForm.close();
  profileValidator.resetValidation();
});

popupWithProfileForm.setEventListeners();


// кнопка редактирования инфы о пользователе
document.querySelector('.profile__edit').addEventListener('click', () => {
  const userData = user.getUserInfo();
  userNameInput.value = userData.name;
  userBioInput.value = userData.bio;
  profileValidator.resetValidation();
  popupWithProfileForm.open();
});


// кнопка добавления новой карточки
document.querySelector('.profile__add').addEventListener('click', () => {
  addPlaceValidator.resetValidation();
  popupWithPlaceForm.open();
});