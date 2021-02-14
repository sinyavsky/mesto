import './index.css';

import {
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
  token: '8c32355f-4347-4868-8ec7-20db7d4995bd'
}); 

// информация о пользователе
const user = new UserInfo({
  nameSel: '.profile__name',
  bioSel: '.profile__bio',
  avaSel: '.profile__ava'
});

api.getUserInfo()
  .then(res => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
  })
  .then(result => {
    user.setUserInfo(result.name, result.about);
    user.setUserAva(result.avatar);
  })
  .catch(err => handleApiError(err));

// включаем валидацию всем формам
const profileValidator = new FormValidator(validationConfig, document.querySelector('.popup__form_type_profile'));
profileValidator.enableValidation();

const addPlaceValidator = new FormValidator(validationConfig, document.querySelector('.popup__form_type_place'));
addPlaceValidator.enableValidation();


// загружаем и рендерим начальные карточки
let cardsList = undefined; // мб есть более элегантный способ, без использования этой переменной?
api.getInitialCards()
  .then(res => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
  })
  .then(result => {
    // собираем только те данные, которые нам нужны
    const initialCards = result.reduce((cards, current) => {
      cards.push({
        name: current.name,
        link: current.link,
        likes: current.likes.length
      });
      return cards;
    }, []);    

    cardsList = new Section({
      items: initialCards, 
      renderer: item => cardsList.addItem(
        createCard({
          name: item.name, 
          pictureSrc: item.link,   
          likes: item.likes,      
          handleCardClick: popupWithImage.open.bind(popupWithImage)
        })
      )
    }, '.cards__list');   
  
    cardsList.renderElements();
  })
  .catch(err => handleApiError(err));

// попап для увеличения картинок
const popupWithImage = new PopupWithImage('.popup_type_picture');
popupWithImage.setEventListeners();


// попап с формой добавления карточек
const popupWithPlaceForm = new PopupWithForm('.popup_type_place', formData => {
  api.postCard({
      name: formData.place_name, 
      link: formData.place_pic,
    },
    // если карточка добавлена успешно
    () => {
      cardsList.addItem(
        createCard({
          name: formData.place_name, 
          pictureSrc: formData.place_pic,     
          likes: 0,  
          handleCardClick: popupWithImage.open.bind(popupWithImage)
        })
      );   
      popupWithPlaceForm.close();
      addPlaceValidator.resetValidation();
    },
    error => handleApiError(error)
  );
   
  
});

popupWithPlaceForm.setEventListeners();


// попап для редактирования инфы о пользователе
const popupWithProfileForm = new PopupWithForm('.popup_type_profile', formData => {    
  api.patchUserInfo({
      name: formData.user_name,
      about: formData.user_bio,
    }, 
    // если данные сохранились - обновим их на странице
    () => user.setUserInfo(formData.user_name, formData.user_bio),
    error => handleApiError(error)
  );
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