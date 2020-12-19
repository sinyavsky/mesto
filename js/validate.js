function hasInvalidInput(inputsList) {   
  return inputsList.some((inputItem) => {  
    return !inputItem.validity.valid;
  })
}; 

function toggleSubmitButton(buttonItem, inputsList, inactiveButtonClass) {
  if(hasInvalidInput(inputsList)) {
    buttonItem.classList.add(inactiveButtonClass);
    buttonItem.disabled = true;
  } 
  else {         
    buttonItem.classList.remove(inactiveButtonClass);
    buttonItem.disabled = false;
  }
}

function showValidityError(formItem, inputItem, errorText, settings) {
  inputItem.classList.add(settings.inputErrorClass);

  const errorItem = formItem.querySelector(`.${inputItem.id}-error`);
  errorItem.classList.add(settings.errorClass);
  errorItem.textContent = errorText;
}

function hideValidityError(formItem, inputItem, settings) {
  inputItem.classList.remove(settings.inputErrorClass);

  const errorItem = formItem.querySelector(`.${inputItem.id}-error`);
  errorItem.classList.remove(settings.errorClass);
  errorItem.textContent = '';
}  

function checkValidity(formItem, inputItem, settings) {
  if(inputItem.validity.valid) {
    hideValidityError(formItem, inputItem, settings);
  }
  else {
    showValidityError(formItem, inputItem, inputItem.validationMessage, settings);
  }
}   

function setEventListeners(formsList, settings) {
  formsList.forEach((formItem) => {
    const inputsList = Array.from(formItem.querySelectorAll(settings.inputSelector));
    const buttonItem = formItem.querySelector(settings.submitButtonSelector);
    toggleSubmitButton(buttonItem, inputsList, settings.inactiveButtonClass);
    inputsList.forEach(function (inputItem) {
      inputItem.addEventListener('input', function () {
        checkValidity(formItem, inputItem, settings);
        toggleSubmitButton(buttonItem, inputsList, settings.inactiveButtonClass);
      });        
    });
  });
}

function enableValidation(settings) {

  const formsList = Array.from(document.querySelectorAll(settings.formSelector));

  formsList.forEach((formItem) => {
    formItem.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  });

  setEventListeners(formsList, settings);   
}