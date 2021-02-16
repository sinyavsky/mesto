import Card from '../components/Card.js';

export const createCard = ({id, name, pictureSrc, likesCounter, isLiked, isOwner, 
                            handleCardClick, handleLikeClick, handleDeleteClick}) => {
    return new Card({
      templateSelector: '.card-template',
      cardSelector: '.card-list__item',
      nameSelector: '.card__name',
      pictureSelector: '.card__picture',
      likeSelector: '.card__like',
      removeSelector: '.card__remove',    
      likeActiveClass: 'card__like_active',
      id: id,
      name: name, 
      pictureSrc: pictureSrc,       
      likesCounter: likesCounter,     
      isLiked: isLiked, 
      isOwner: isOwner,
      handleCardClick: handleCardClick,
      handleLikeClick: handleLikeClick,
      handleDeleteClick: handleDeleteClick
    }).createCard();
}

export const handleApiError = message => {
  // мб в будущих спринтах будет задача обрабатывать ошибки как-то иначе, пока оставлю так
  console.log(message);
}