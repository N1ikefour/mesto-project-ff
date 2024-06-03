 export const createCard = (cardData, onDelete, onHeart, onImageClick) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const heart = cardElement.querySelector('.card__like-button');

  heart.addEventListener('click', onHeart);

  const cardImage = cardElement.querySelector('.card__image')
  cardImage.onclick = onImageClick
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    onDelete(cardElement);
  })
  return cardElement;
  
}

export function handleHeartClick (evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}
// @todo: Функция удаления карточки
export function onDelete (deleteCard) {
  deleteCard.remove();
}
