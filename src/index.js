import './index.css';
import {initialCards} from './cards'
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.places__list');
// const profileEditButton = document.querySelector('.profile__edit-button')
// @todo: Функция создания карточки


const cardAdd = (cardData, onDelete, onHeart, onImageClick) => {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const heart = cardElement.querySelector('.card__like-button');
  heart.onclick = onHeart

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

function handleHeartClick (evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}
// @todo: Функция удаления карточки
function onDelete (deleteCard) {
  deleteCard.remove();
}
// @todo: Вывести карточки на страницу

function outputInitialCards (cards) {
  cards.forEach((data) =>{
    const card = cardAdd(data, onDelete, handleHeartClick, handleOnImageClick);
    cardsContainer.append(card)
  })
}

outputInitialCards(initialCards);



const profileEditButton = document.querySelector('.profile__edit-button')
const popupTypeEdit = document.querySelector('.popup_type_edit')
const popupTypeImage = document.querySelector ('.popup_type_image')
const popupTypeImageImg = document.querySelector('.popup__image')
const popupTypeImageP = document.querySelector('.popup__caption')
const popupTypeNew = document.querySelector('.popup_type_new-card')
const profileAddButton = document.querySelector('.profile__add-button')
const formElement = document.forms["edit-profile"];
const formElementNew = document.forms["new-place"]
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


const closePopup = function (popup) {
  popup.classList.remove("popup_is-opened");
  console.log(popup)
}
function openPopup(popup) {
  popup.classList.add('popup_is-animated');  
  popup.classList.add("popup_is-opened")

  function closeCurrentPopup() {
    closePopup(popup)
  }
  function closeCurrentPopupByOverlay(evt) {
    if (evt.currentTarget === evt.target)
    closePopup(popup)
  }
  popup.addEventListener("click", closeCurrentPopupByOverlay);
  [...document.querySelectorAll(".popup__close")].forEach(elem => elem.addEventListener("click", closeCurrentPopup))


  document.addEventListener('keydown', function (evt) {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  });
}

profileEditButton.addEventListener("click", ()=>{
  openPopup(popupTypeEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
})

profileAddButton.addEventListener("click", ()=> {
  openPopup(popupTypeNew)
})
 




function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value

  // Выберите элементы, куда должны быть вставлены значения полей
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  // closeCurrentPopup()
  nameInput.value = null;
  jobInput.value = null;
  closePopup(evt.target.closest(".popup"))
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
formElementNew.addEventListener('submit', handleFormNewSubmit);



function handleFormNewSubmit (evt) {
  evt.preventDefault();

  const newNameInput = document.querySelector('.popup__input_type_card-name')
  const linkInput = document.querySelector(".popup__input_type_url")
  
  const data = {
    name: newNameInput.value,
    link: linkInput.value
  }

  const card = cardAdd(data, onDelete, handleHeartClick, handleOnImageClick);
  cardsContainer.insertBefore(card, cardsContainer.firstChild)
  newNameInput.value = null;
  linkInput.value = null;
  closePopup(evt.target.closest(".popup"))
}



function handleOnImageClick (evt) {
  const image = evt.target;
  const namecard = image.closest('li').querySelector('.card__title');
  const imageLink = image.src;
  const nameCardDesc = namecard.textContent;

  openPopup(popupTypeImage)
  popupTypeImageImg.src = imageLink;
  popupTypeImageP.textContent = nameCardDesc
}




 


 




