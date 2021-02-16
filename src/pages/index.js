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
  .then(result => user.initUserData(result))
  .catch(err => handleApiError(err));

// включаем валидацию всем формам
const profileValidator = new FormValidator(validationConfig, document.querySelector('.popup__form_type_profile'));
profileValidator.enableValidation();

const addPlaceValidator = new FormValidator(validationConfig, document.querySelector('.popup__form_type_place'));
addPlaceValidator.enableValidation();

// загружаем и рендерим начальные карточки
let cardsList = undefined; // мб есть более элегантный способ, без использования этой переменной?
api.getInitialCards()
  .then(result => { 
    cardsList = new Section({
      items: result, 
      renderer: item => {
        const isLiked = item.likes.some(like => {
            return like._id === user.getUserId();
        });

        cardsList.addItem(
          createCard({
            name: item.name, 
            pictureSrc: item.link,   
            likesCounter: item.likes.length,
            isLiked: isLiked,
            id: item._id,      
            handleCardClick: popupWithImage.open.bind(popupWithImage),
            handleLikeClick: (card, like) => {
              if(like) {
                api.putLike(card.getCardId())
                  .then(result => card.updateLikesCounter(result.likes.length))
                  .catch(err => handleApiError(err));
              }
              else {
                api.deleteLike(card.getCardId())
                  .then(result => card.updateLikesCounter(result.likes.length))
                  .catch(err => handleApiError(err));
              }
            },
            handleDeleteClick: (cardElement) => {
              popupWithConfirmForm.setOptions({
                elementToDelete: cardElement
              });
              popupWithConfirmForm.open();            
            }
          }, user.getUserId() === item.owner._id)
        );
      }
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
  })    
    .then((result) => {       

      cardsList.addItem(
        createCard({
          id: result._id,
          name: formData.place_name, 
          pictureSrc: formData.place_pic,     
          likesCounter: 0,  
          handleCardClick: popupWithImage.open.bind(popupWithImage),
          handleLikeClick: (card, like) => {
            if(like) {
              api.putLike(card.getCardId())
                .then(result => card.updateLikesCounter(result.likes.length))
                .catch(err => handleApiError(err));
            }
            else {
              api.deleteLike(card.getCardId())
                .then(result => card.updateLikesCounter(result.likes.length))
                .catch(err => handleApiError(err));
            }
          },
          handleDeleteClick: (cardElement) => {
            popupWithConfirmForm.setOptions({
              elementToDelete: cardElement
            });
            popupWithConfirmForm.open();            
          }
        }, true)
      );   
      popupWithPlaceForm.close();
      addPlaceValidator.resetValidation();
    })
    .catch(err => handleApiError(err)); 
});

popupWithPlaceForm.setEventListeners();

// попап для редактирования инфы о пользователе
const popupWithProfileForm = new PopupWithForm('.popup_type_profile', formData => {    
  api.patchUserInfo({
    name: formData.user_name,
    about: formData.user_bio,
  })    
    .then(() => {
      user.updateUserInfo(formData.user_name, formData.user_bio);
      popupWithProfileForm.close();
      profileValidator.resetValidation();
    })
    .catch(err => handleApiError(err));   
});

popupWithProfileForm.setEventListeners();


// попап для подтверждения удаления карточки
const popupWithConfirmForm = new PopupWithForm('.popup_type_confirm', () => {
  const card = popupWithConfirmForm.getOptions().elementToDelete;
  api.deleteCard(card.getCardId())
    .catch(err => handleApiError(err));   
  card.removeCard();
  popupWithConfirmForm.clearOptions();
  popupWithConfirmForm.close();
});

popupWithConfirmForm.setEventListeners();


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