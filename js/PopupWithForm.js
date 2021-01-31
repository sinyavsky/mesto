import Popup from './Popup.js';


export default class PopupWithForm extends Popup {

  constructor(popupSel, submitEvent) {
    super(popupSel);

    this._submitEvent = submitEvent;
    // думаю ничего страшного, что обращение не по классу
    // т.к. подразумевается, что в поп-апе у нас только 1 форма
    this._form = this._popup.querySelector('form');
  }

  _getInputValues() {
    // а вот здесь мне кажется уместна выборка по классу
    // т.к. в теории у нас может быть форма и с textarea, и с input[type=submit] (содержимое которого собирать не надо)
    // но в брифе не указано, что мы можем дополнительно передавать в класс еще и селектор инпутов, поэтому выбираю по тегу
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