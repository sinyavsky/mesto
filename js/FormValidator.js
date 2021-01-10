export default class FormValidator {

  constructor(settings, formElement) {    
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(settings.submitButtonSelector);
    this._inputsList = Array.from(this._formElement.querySelectorAll(settings.inputSelector));
  }

  _hasInvalidInput(inputsList) {   
    return inputsList.some((inputItem) => {  
      return !inputItem.validity.valid;
    })
  }; 

  _toggleSubmitButton() {
    if(this._hasInvalidInput(this._inputsList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } 
    else {         
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _clearErrors() {
    const errorsElements = Array.from(this._formElement.querySelectorAll(`.${this._errorClass}`));
    errorsElements.forEach(errorItem => errorItem.classList.remove(this._errorClass));

    this._inputsList.forEach(inputItem => inputItem.classList.remove(this._inputErrorClass));
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
    this._toggleSubmitButton();
    this._inputsList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._checkValidity(inputItem);
        this._toggleSubmitButton();
      });        
    });   
  }

  enableValidation() {    
    this._setEventListeners();  
  }

  resetValidation() {
    this._clearErrors();
    this._toggleSubmitButton();
  }
  
}