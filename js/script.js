let profileEditButton = document.querySelector('.profile__edit');
profileEditButton.addEventListener('click',onPopupOpen);

let popupCloseButton = document.querySelector('.popup__close');
popupCloseButton.addEventListener('click',onPopupClose);

let popupForm = document.querySelector('.popup__form');
popupForm.addEventListener('submit',onPopupFormSubmit);

function onPopupOpen() {
  let nameValue = document.querySelector('.profile__name').textContent;
  let nameInput = document.querySelector('.popup__input_name');
  nameInput.value = nameValue;

  let bioValue = document.querySelector('.profile__bio').textContent;
  let bioInput = document.querySelector('.popup__input_bio');
  bioInput.value = bioValue;

  let popup = document.querySelector('.popup');
  popup.classList.add('popup_opened');
}

function onPopupClose() {
  let popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');
}

function onPopupFormSubmit(e) {
  e.preventDefault();
  
  let nameValue = document.querySelector('.popup__input_name').value;
  let profileName = document.querySelector('.profile__name');
  profileName.textContent = nameValue;

  let bioValue = document.querySelector('.popup__input_bio').value;
  let profileBio = document.querySelector('.profile__bio');
  profileBio.textContent = bioValue;

  let popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');
}