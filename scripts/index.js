// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.places__list');
// @todo: Функция создания карточки


const cardAdd = (cardData, onDelete) => {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    onDelete(cardElement);
  })
  return cardElement;
  
}
// @todo: Функция удаления карточки
function onDelete (deleteCard) {
  deleteCard.remove();
}
// @todo: Вывести карточки на страницу

function outputInitialCards (cards) {
  cards.forEach((data) =>{
    const card = cardAdd(data, onDelete);
    cardsContainer.append(card)
  })
}
outputInitialCards(initialCards);