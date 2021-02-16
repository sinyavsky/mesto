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


// readme
// эти две функции нужны, чтобы избежать дублирования в createCard
// я не вынес их в functions.js, т.к. они используют константу api
// которая инициализируется в этом файле чуть выше
// а экспортировать api из этого файла в файл functions.js мне кажется плохой идеей

const handleLikeClick = (card, like) => {
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
}

const handleDeleteClick = cardElement => {
  popupWithConfirmForm.setOptions({
    elementToDelete: cardElement
  });
  popupWithConfirmForm.open();            
}


// пользователь

const user = new UserInfo({
  nameSel: '.profile__name',
  bioSel: '.profile__bio',
  avaSel: '.profile__ava'
});

api.getUserInfo()  
  .then(result => user.initUserData(result))
  .catch(err => handleApiError(err));


// стартовый набор карточек

let cardsList = null; // мб есть более элегантный способ, чтобы не инициализировать переменую так
api.getInitialCards()
  .then(result => { 
    cardsList = new Section({
      items: result, 
      renderer: item => {
        const likeAssigned = item.likes.some(like => {
            return like._id === user.getUserId();
        });

        cardsList.addItem(
          createCard({
            id: item._id,
            name: item.name, 
            pictureSrc: item.link, 
            likesCounter: item.likes.length,
            isLiked: likeAssigned,
            isOwner: user.getUserId() === item.owner._id,
            handleCardClick: popupWithImage.open.bind(popupWithImage),
            handleLikeClick: handleLikeClick,
            handleDeleteClick: handleDeleteClick
          })
        );
      }
    }, '.cards__list');   
  
    cardsList.renderElements();
  })
  .catch(err => handleApiError(err));


// попап с формой добавления карточек

const popupWithPlaceForm = new PopupWithForm('.popup_type_place', formData => {
  popupWithPlaceForm.setButtonStateUpdating('Сохранение...');
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
          isLiked: false,
          isOwner: true,
          handleCardClick: popupWithImage.open.bind(popupWithImage),
          handleLikeClick: handleLikeClick,
          handleDeleteClick: handleDeleteClick
        })
      );   
      popupWithPlaceForm.close();
      addPlaceValidator.resetValidation();
    })
    .catch(err => handleApiError(err))
    .finally(() => popupWithPlaceForm.resetButtonState()); 
});

popupWithPlaceForm.setEventListeners();


// попап для редактирования инфы о пользователе

const popupWithProfileForm = new PopupWithForm('.popup_type_profile', formData => {    
  popupWithProfileForm.setButtonStateUpdating('Сохранение...');
  api.patchUserInfo({
    name: formData.user_name,
    about: formData.user_bio,
  })    
    .then(() => {
      user.updateUserInfo(formData.user_name, formData.user_bio);
      popupWithProfileForm.close();
      profileValidator.resetValidation();
    })
    .catch(err => handleApiError(err))
    .finally(() => popupWithProfileForm.resetButtonState());   
});

popupWithProfileForm.setEventListeners();


// попап для редактирования аватара

const popupWithAvatarForm = new PopupWithForm('.popup_type_avatar', formData => {   
  popupWithAvatarForm.setButtonStateUpdating('Сохранение...');
  api.patchUserAvatar(formData.avatar)
    .then(() => {
      user.updateUserAvatar(formData.avatar);
      popupWithAvatarForm.close();
    })
    .catch(err => handleApiError(err))
    .finally(() => popupWithAvatarForm.resetButtonState());
});

popupWithAvatarForm.setEventListeners();


// попап для подтверждения удаления карточки

const popupWithConfirmForm = new PopupWithForm('.popup_type_confirm', () => {
  popupWithConfirmForm.setButtonStateUpdating('Удаление...');
  const card = popupWithConfirmForm.getOptions().elementToDelete;
  api.deleteCard(card.getCardId())
    .then(() => { // удаляем со страницы только после успешного ответа сервера
      card.removeCard();
      popupWithConfirmForm.clearOptions();
      popupWithConfirmForm.close();
    })
    .catch(err => handleApiError(err))
    .finally(() => popupWithConfirmForm.resetButtonState());
});

popupWithConfirmForm.setEventListeners();


// попап для увеличения картинок

const popupWithImage = new PopupWithImage('.popup_type_picture');
popupWithImage.setEventListeners();


// включаем валидацию всем формам

const profileValidator = new FormValidator(validationConfig, document.querySelector('.popup__form_type_profile'));
profileValidator.enableValidation();

const addPlaceValidator = new FormValidator(validationConfig, document.querySelector('.popup__form_type_place'));
addPlaceValidator.enableValidation();

const avatarValidator = new FormValidator(validationConfig, document.querySelector('.popup__form_type_avatar'));
avatarValidator.enableValidation();


// кнопка редактирования инфы о пользователе

document.querySelector('.profile__edit').addEventListener('click', () => {
  const userData = user.getUserInfo();
  userNameInput.value = userData.name;
  userBioInput.value = userData.bio;
  profileValidator.resetValidation();
  popupWithProfileForm.open();
});


// кнопка редактирования аватара

document.querySelector('.profile__ava-edit').addEventListener('click', () => {
  avatarValidator.resetValidation();
  popupWithAvatarForm.open();
});


// кнопка добавления новой карточки

document.querySelector('.profile__add').addEventListener('click', () => {
  addPlaceValidator.resetValidation();
  popupWithPlaceForm.open();
});