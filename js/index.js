import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

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

const profileForm = document.querySelector('.popup__form_type_profile');
const placeForm = document.querySelector('.popup__form_type_place');

// инициализация валидации

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const profileValidator = new FormValidator(validationConfig, profileForm);
profileValidator.enableValidation();

const addPlaceValidator = new FormValidator(validationConfig, placeForm);
addPlaceValidator.enableValidation();


const cardsList = new Section({items: initialCards, renderer: (item) => {
    cardsList.addItem(createItem(item.name, item.link));
  }
}, '.cards__list');

document.addEventListener('DOMContentLoaded', () => {   
  cardsList.renderElements();
});

const popupWithImage = new PopupWithImage('.popup_type_picture');
popupWithImage.setEventListeners();

const placeFormPopup = new PopupWithForm('.popup_type_place', (formData) => {
    cardsList.addItem(createItem(formData.place_name, formData.place_pic));    
    placeFormPopup.close();
    addPlaceValidator.resetValidation();
});
placeFormPopup.setEventListeners();

const userInfo = new UserInfo({nameSel: '.profile__name', bioSel: '.profile__bio'});

const profileFormPopup = new PopupWithForm('.popup_type_profile', (formData) => {
  console.log(formData);
  userInfo.setUserInfo({name: formData.user_name, bio: formData.user_bio});  
  profileFormPopup.close();
  profileValidator.resetValidation();
});
profileFormPopup.setEventListeners();

// TODO: отрефакторить код ниже

// объекты для редактирования профиля

const profileEditButton = document.querySelector('.profile__edit');

// объекты для добавления карточек

const placeAddButton = document.querySelector('.profile__add');


// функции для взаимодействия с карточками

function createItem(name, pictureSrc) {
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
    popupHandler: popupWithImage.open.bind(popupWithImage)
  });  

  return card.createCard();
}

// привязка к событиям



profileEditButton.addEventListener('click', () => {
  const user = userInfo.getUserInfo();
  document.querySelector('.popup__input_type_name').value = user.name;
  document.querySelector('.popup__input_type_bio').value = user.bio;
  profileValidator.resetValidation();
  profileFormPopup.open();
});
placeAddButton.addEventListener('click', () => placeFormPopup.open());


