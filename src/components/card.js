import {deleteCardServ, likecard} from './api';
export const createCard = (cardData, onDelete, onHeart, onImageClick, userId) => {
 const cardTemplate = document.querySelector('#card-template').content;
 const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
 const heart = cardElement.querySelector('.card__like-button');

 heart.addEventListener('click',  (evt) => onHeart(evt, cardData._id));

 const cardImage = cardElement.querySelector('.card__image')
 cardImage.addEventListener("click", () => onImageClick(cardData.link, cardData.name))
 cardElement.querySelector('.card__title').textContent = cardData.name;
 cardElement.querySelector('.card__image').src = cardData.link;
 cardElement.querySelector('.card__image').alt = cardData.name;
 cardElement.querySelector('.likes').textContent = cardData.likes.length;

 if (cardData.likes.map(data => data._id).includes(userId))
   cardElement.querySelector('.card__like-button').classList.add('card__like-button_is-active')
 
 if (userId !== cardData.owner._id) {
   cardElement.querySelector('.card__delete-button').hidden = true;
 }
 else {
 const deleteButton = cardElement.querySelector('.card__delete-button');
 deleteButton.addEventListener('click', () => {
   onDelete(cardElement, cardData._id);
 })
 }
 return cardElement;
 
}

export function handleHeartClick (evt, _id) {
 let method;
 if (evt.target.classList.contains('card__like-button_is-active'))
   method = "DELETE"
   else
   method = "PUT"
 likecard(_id, method)
 .then((data) => {
   evt.target.classList.toggle('card__like-button_is-active')
   evt.target.parentElement.querySelector('.likes').textContent = data.likes.length
 })
}
// @todo: Функция удаления карточки
export function onDelete (deleteCard, cardId) {
 deleteCardServ(cardId)
   .then( () => deleteCard.remove())
}



