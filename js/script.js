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

const cardTemplate = document.querySelector('.card-template').content;
const cardsList = document.querySelector('.cards__list');


// объекты для увеличения картинок

const picturePopup = document.querySelector('.popup-picture');
const picturePopupCloseButton = document.querySelector('.popup-picture__close');
const popupPictureTemplate = document.querySelector('.popup-picture-template').content;


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
      
  newCardPic.addEventListener('click',zoomPicture);

  newCard.querySelector('.card__like').addEventListener('click',toggleLike);
  newCard.querySelector('.card__remove').addEventListener('click',removeCard)
  
  return newCard;  
}

function addCard(container, element) {
  container.prepend(element);
}

function openPlacePopup() {      
  placePopup.classList.add('popup_opened');
}

function closePlacePopup() {
  placePopup.classList.remove('popup_opened');
}

function submitPlaceForm(e) {
  e.preventDefault();  
  addCard(cardsList,createCard(placeNameInput.value,placePicInput.value));

  placeNameInput.value = '';
  placePicInput.value = '';
  
  closePlacePopup();
}


// функции для увеличения картинок

function openPicturePopup() {
  picturePopup.classList.add('popup-picture_opened');
}

function closePicturePopup() {
  picturePopup.classList.remove('popup-picture_opened');
}

function zoomPicture(evt) {
  const contentCurrent = document.querySelector('.popup-picture__content');
  const contentNew = popupPictureTemplate.cloneNode(true);  
  
  const picture = contentNew.querySelector('.popup-picture__img');
  const name = contentNew.querySelector('.popup-picture__name');

  // это выглядит стрёмно, возможно лучше делать через querySelector от родителя
  const nameText = evt.target.nextElementSibling.children[0].textContent;

  picture.src = evt.target.src;
  picture.alt = nameText;
  name.textContent = nameText; 

  contentCurrent.replaceWith(contentNew);
  openPicturePopup();  
}


// привязка к событиям

document.addEventListener('DOMContentLoaded',() => {  // демонстрация, что я освоил стрелочные функции :)  
  initialCards.forEach((item) => {
      addCard(cardsList,createCard(item.name,item.link));      
    });
});

profileEditButton.addEventListener('click',openProfilePopup);
profilePopupCloseButton.addEventListener('click',closeProfilePopup);
profileForm.addEventListener('submit',submitProfileForm);

placeAddButton.addEventListener('click',openPlacePopup);
placePopupCloseButton.addEventListener('click',closePlacePopup);
placeForm.addEventListener('submit',submitPlaceForm);

picturePopupCloseButton.addEventListener('click',closePicturePopup);