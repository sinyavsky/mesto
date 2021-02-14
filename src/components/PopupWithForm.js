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
    this._form.addEventListener('submit', () => this._submitEvent(this._getInputValues()));
  }

  close() {
    super.close();
    this._form.reset();
  }

}