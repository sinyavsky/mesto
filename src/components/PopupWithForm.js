import Popup from './Popup.js';


export default class PopupWithForm extends Popup {

  constructor(popupSel, submitEvent) {
    super(popupSel);

    this._submitEvent = submitEvent;
    this._form = this._popup.querySelector('form');
  }

  _getInputValues() {
    const inputs = this._form.querySelectorAll('input');
    const formData = {};

    inputs.forEach(item => formData[item.getAttribute('name')] = item.value);
    return formData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitEvent(this._getInputValues())
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
  
  // опции = доп. данные, которые могут понадобиться поп-апу для работы

  setOptions(options) {
    this._options = options;
  }

  getOptions() {
    return this._options;
  }

  clearOptions() {
    this._options = undefined;
  }

}