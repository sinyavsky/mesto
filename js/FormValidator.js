export default class FormValidator {

  constructor(settings, formElement) {    
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;
  }

  _hasInvalidInput(inputsList) {   
    return inputsList.some((inputItem) => {  
      return !inputItem.validity.valid;
    })
  }; 

  _toggleSubmitButton(buttonItem, inputsList) {
    if(this._hasInvalidInput(inputsList)) {
      buttonItem.classList.add(this._inactiveButtonClass);
      buttonItem.disabled = true;
    } 
    else {         
      buttonItem.classList.remove(this._inactiveButtonClass);
      buttonItem.disabled = false;
    }
  }

  _clearErrors() {
    const errorsElements = Array.from(this._formElement.querySelectorAll(`.${this._errorClass}`));
    errorsElements.forEach(errorItem => errorItem.classList.remove(this._errorClass));

    const inputElements = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    inputElements.forEach(inputItem => inputItem.classList.remove(this._inputErrorClass));
  }

  _showValidityError(inputItem, errorText) {
    inputItem.classList.add(this._inputErrorClass);
  
    const errorItem = this._formElement.querySelector(`.${inputItem.id}-error`);
    errorItem.classList.add(this._errorClass);
    errorItem.textContent = errorText;
  }

  _hideValidityError(inputItem) {
    inputItem.classList.remove(this._inputErrorClass);
  
    const errorItem = this._formElement.querySelector(`.${inputItem.id}-error`);
    errorItem.classList.remove(this._errorClass);
    errorItem.textContent = '';
  }  

  _checkValidity(inputItem) {
    if(inputItem.validity.valid) {
      this._hideValidityError(inputItem);
    }
    else {
      this._showValidityError(inputItem, inputItem.validationMessage);
    }
  }  

  _setEventListeners() {
    this._formElement.addEventListener('submit', evt => evt.preventDefault());

    const inputsList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonItem = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleSubmitButton(buttonItem, inputsList);
    inputsList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._checkValidity(inputItem);
        this._toggleSubmitButton(buttonItem, inputsList);
      });        
    });   
  }

  enableValidation() {    
    this._setEventListeners();  
  }

  resetValidation() {
    this._clearErrors();

    const inputsList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonItem = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleSubmitButton(buttonItem, inputsList);
  }
  
}