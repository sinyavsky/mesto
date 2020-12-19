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

function showValidityError(formItem, inputItem, errorText, inputErrorClass, errorClass) {
  inputItem.classList.add(inputErrorClass);

  const errorItem = formItem.querySelector(`.${inputItem.id}-error`);
  errorItem.classList.add(errorClass);
  errorItem.textContent = errorText;
}

function hideValidityError(formItem, inputItem, inputErrorClass, errorClass) {
  inputItem.classList.remove(inputErrorClass);

  const errorItem = formItem.querySelector(`.${inputItem.id}-error`);
  errorItem.classList.remove(errorClass);
  errorItem.textContent = '';
}  

function checkValidity(formItem, inputItem, inputErrorClass, errorClass) {
  if(inputItem.validity.valid) {
    hideValidityError(formItem, inputItem, inputErrorClass, errorClass);
  }
  else {
    showValidityError(formItem, inputItem, inputItem.validationMessage, inputErrorClass, errorClass);
  }
}   

function setEventListeners(formsList, settings) {
  formsList.forEach((formItem) => {
    const inputsList = Array.from(formItem.querySelectorAll(settings.inputSelector));
    const buttonItem = formItem.querySelector(settings.submitButtonSelector);
    toggleSubmitButton(buttonItem, inputsList, settings.inactiveButtonClass);

    inputsList.forEach(function (inputItem) {
      inputItem.addEventListener('input', function () {
        // сначала хотел вместо последних двух аргументов передать один объект settings,
        // но подумал, что 2 аргумента не так уж много и нагляднее передать их раздельно
        checkValidity(formItem, inputItem, settings.inputErrorClass, settings.errorClass);
        toggleSubmitButton(buttonItem, inputsList, settings.inactiveButtonClass);
      });        
    });
  });
}

function enableValidation(settings) {

  const formsList = Array.from(document.querySelectorAll(settings.formSelector));

  // селектор формы больше не нужен
  delete settings.formSelector;

  formsList.forEach((formItem) => {
    formItem.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  });

  setEventListeners(formsList, settings);   
}