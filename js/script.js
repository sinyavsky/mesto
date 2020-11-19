// для регистрации событий
let profileEditButton = document.querySelector('.profile__edit');
let popupCloseButton = document.querySelector('.popup__close');
let popupForm = document.querySelector('.popup__form');

// для обращения внутри функций
let nameElement = document.querySelector('.profile__name');
let nameInput = document.querySelector('.popup__input_name');

let bioElement = document.querySelector('.profile__bio');
let bioInput = document.querySelector('.popup__input_bio');

let popup = document.querySelector('.popup');


function onPopupOpen() {  
  nameInput.value = nameElement.textContent;
  bioInput.value = bioElement.textContent;
  
  popup.classList.add('popup_opened');
}

function onPopupClose() {
  popup.classList.remove('popup_opened');
}

function onPopupFormSubmit(e) {
  e.preventDefault();

  nameElement.textContent = nameInput.value;  
  bioElement.textContent = bioInput.value;

  onPopupClose();
}


profileEditButton.addEventListener('click',onPopupOpen);
popupCloseButton.addEventListener('click',onPopupClose);
popupForm.addEventListener('submit',onPopupFormSubmit);