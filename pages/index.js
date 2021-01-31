import {
  initialCards,
  validationConfig
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


// информация о пользователе
const user = new UserInfo({nameSel: '.profile__name', bioSel: '.profile__bio'});


// включаем валидацию всем формам
const profileValidator = new FormValidator(validationConfig, document.querySelector('.popup__form_type_profile'));
profileValidator.enableValidation();

const addPlaceValidator = new FormValidator(validationConfig, document.querySelector('.popup__form_type_place'));
addPlaceValidator.enableValidation();


// рендер карточек
const cardsList = new Section({
  items: initialCards, 
  renderer: item => cardsList.addItem(
    new Card({
      name: item.name, 
      pictureSrc: item.link,
      templateSelector: '.card-template',
      cardSelector: '.card-list__item',
      nameSelector: '.card__name',
      pictureSelector: '.card__picture',
      likeSelector: '.card__like',
      removeSelector: '.card__remove',    
      likeActiveClass: 'card__like_active',    
      handleCardClick: popupWithImage.open.bind(popupWithImage)
    }).createCard())
}, '.cards__list');
document.addEventListener('DOMContentLoaded', () => cardsList.renderElements());


// попап для увеличения картинок
const popupWithImage = new PopupWithImage('.popup_type_picture');
popupWithImage.setEventListeners();


// попап с формой добавления карточек
const popupWithPlaceForm = new PopupWithForm('.popup_type_place', formData => {
  cardsList.addItem(new Card({
    name: formData.place_name, 
    pictureSrc: formData.place_pic,
    templateSelector: '.card-template',
    cardSelector: '.card-list__item',
    nameSelector: '.card__name',
    pictureSelector: '.card__picture',
    likeSelector: '.card__like',
    removeSelector: '.card__remove',    
    likeActiveClass: 'card__like_active',    
    handleCardClick: popupWithImage.open.bind(popupWithImage)
  }).createCard());    
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
  document.querySelector('.popup__input_type_name').value = userData.name;
  document.querySelector('.popup__input_type_bio').value = userData.bio;
  profileValidator.resetValidation();
  popupWithProfileForm.open();
});


// кнопка добавления новой карточки
document.querySelector('.profile__add').addEventListener('click', () => {
  addPlaceValidator.resetValidation();
  popupWithPlaceForm.open();
});