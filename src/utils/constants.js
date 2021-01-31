import gates from '../images/most-zolotye-vorota.jpg';
import karpatos from '../images/karpatos.jpg';
import berlin from '../images/berlinskiy-kafedralnyy-sobor.jpg';
import square from '../images/krasnaya-ploshad.jpg';
import japur from '../images/dzhaypur.jpg';
import france from '../images/eyfeleva-bashnya.jpg';

export const initialCards = [
  {
    name: 'Мост Золотые Ворота',
    link: gates
  },
  {
    name: 'Карпатос',
    link: karpatos
  },
  {
    name: 'Берлинский Кафедральный Собор',
    link: berlin
  },
  {
    name: 'Красная Площадь',
    link: square
  },
  {
    name: 'Джайпур',
    link: japur
  },
  {
    name: 'Эйфелева Башня',
    link: france
  }
]; 

export const cardDefaultSettings = {
  templateSelector: '.card-template',
  cardSelector: '.card-list__item',
  nameSelector: '.card__name',
  pictureSelector: '.card__picture',
  likeSelector: '.card__like',
  removeSelector: '.card__remove',    
  likeActiveClass: 'card__like_active' 
};

export const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};