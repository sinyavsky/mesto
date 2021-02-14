import Card from '../components/Card.js';

export const createCard = ({name, pictureSrc, handleCardClick}) => {
    return new Card({
      templateSelector: '.card-template',
      cardSelector: '.card-list__item',
      nameSelector: '.card__name',
      pictureSelector: '.card__picture',
      likeSelector: '.card__like',
      removeSelector: '.card__remove',    
      likeActiveClass: 'card__like_active',
      name: name, 
      pictureSrc: pictureSrc,       
      handleCardClick: handleCardClick
    }).createCard();
}

export const handleApiError = message => {
  // мб в будущих спринтах будет задача обрабатывать ошибки как-то иначе, пока оставлю так
  console.log(message);
}