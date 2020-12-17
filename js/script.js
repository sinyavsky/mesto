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


// объекты для добавления карточек

const placeAddButton = document.querySelector('.profile__add');
const placePopup = document.querySelector('.popup_type_place');
const placeForm = document.querySelector('.popup__form_type_place');

const placeNameInput = document.querySelector('.popup__input_type_place-name');
const placePicInput = document.querySelector('.popup__input_type_place-pic');

const cardTemplate = document.querySelector('.card-template').content;
const cardsList = document.querySelector('.cards__list');


// объекты для увеличения картинок

const picturePopup = document.querySelector('.popup_type_picture');

const popupPictureImg = document.querySelector('.popup__picture');
const popupPictureName = document.querySelector('.popup__picture-name');


// общие функции модальных окон

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


// функции для профиля

function openProfilePopup() {  
  profileNameInput.value = profileNameElement.textContent;
  profileBioInput.value = profileBioElement.textContent;  
  openPopup(profilePopup);
}

function submitProfileForm(e) {
  e.preventDefault();

  profileNameElement.textContent = profileNameInput.value;  
  profileBioElement.textContent = profileBioInput.value;

  closePopup(profilePopup);
}


// функции для взаимодействия с карточками

function toggleLike(evt) {
  evt.target.classList.toggle('card__like_active');
}

function removeCard(evt) {
  evt.target.closest('.card-list__item').remove();
}


// функции для добавления карточек

function createCard(name, link) {
  const newCard = cardTemplate.cloneNode(true);   
  const newCardName = newCard.querySelector('.card__name');
  const newCardPic = newCard.querySelector('.card__picture');

  // длинные названия не поместятся, поэтому утанавливаем и title
  newCardName.textContent = name;
  newCardName.title = name;

  newCardPic.src = link;
  newCardPic.alt = name;
  newCardPic.title = name;
      
  newCardPic.addEventListener('click',openPicturePopup);

  newCard.querySelector('.card__like').addEventListener('click',toggleLike);
  newCard.querySelector('.card__remove').addEventListener('click',removeCard)
  
  return newCard;  
}

function addCard(container, element) {
  container.prepend(element);
}

function submitPlaceForm(e) {
  e.preventDefault();  
  addCard(cardsList,createCard(placeNameInput.value,placePicInput.value));
  placeForm.reset();  
  closePopup(placePopup);
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
      addCard(cardsList,createCard(item.name,item.link));      
    });
});

profileEditButton.addEventListener('click',openProfilePopup);

profileForm.addEventListener('submit',submitProfileForm);

placeAddButton.addEventListener('click',() => {
  openPopup(placePopup);
});

placeForm.addEventListener('submit',submitPlaceForm);

// закрытие модальных окон при клике на оверлей или кнопку закрытия
popups.forEach((item) => {
  item.addEventListener('click', function (evt) {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close'))
      closePopup(this);
  });
});