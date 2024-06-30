import './index.css';
import { createCard, onDelete, handleHeartClick} from './components/card';
import { openPopup, closePopup} from './components/modal';
import { enableValidation, clearValidation} from './components/validation';
import {meInfo, cards, editProfile, addCard, editAvatar} from './components/api';
// import {closePopupByEsc} from './components/modal.js'
// @todo: Темплейт карточки

// @todo: DOM узлы
const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.places__list');

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function outputInitialCards (cards) {
  cards.forEach((data) =>{
    const card = createCard(data, onDelete, handleHeartClick, handleOnImageClick, userId);
    cardsContainer.append(card)
  })
}


// outputInitialCards(initialCards);


let userId
const profileEditButton = document.querySelector('.profile__edit-button')
const popupTypeEdit = document.querySelector('.popup_type_edit')
const popupTypeImage = document.querySelector ('.popup_type_image')
const popupTypeImageImg = document.querySelector('.popup__image')
const popupTypeImageP = document.querySelector('.popup__caption')
const popupTypeNew = document.querySelector('.popup_type_new-card')
const profileAddButton = document.querySelector('.profile__add-button')
const formElement = document.forms["edit-profile"];
const formElementNew = document.forms["new-place"]
const formElementAvatar = document.forms["avatar"]
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const avatar = document.querySelector('.profile__image');
const popupTypeNewAvatar = document.querySelector('.popup_type_new-avatar');

[...document.querySelectorAll(".popup__close")].forEach(elem => elem.addEventListener("click", evt=>{
  closePopup(evt.target.closest(".popup"))
}));

[...document.querySelectorAll('.popup')].forEach(elem => elem.addEventListener("mousedown", evt => {
  if (evt.target === elem)
    closePopup(evt.target.closest(".popup"))
}))


avatar.addEventListener("click", () =>{
  clearValidation(formElementAvatar, validationConfig)
  formElementAvatar.reset();
  openPopup(popupTypeNewAvatar)
})

profileEditButton.addEventListener("click", ()=>{
  nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  clearValidation(formElement, validationConfig)
  openPopup(popupTypeEdit);
})

profileAddButton.addEventListener("click", ()=> {
  clearValidation(formElementNew, validationConfig)
  formElementNew.reset()
  openPopup(popupTypeNew)

})
 




function handleFormEditSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.
  // Получите значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value
  const button = evt.target.querySelector('.button');
  button.textContent = 'Сохранение...';
  editProfile(nameValue, jobValue)
    .then(data => {
      // Выберите элементы, куда должны быть вставлены значения полей
      const profileTitle = document.querySelector('.profile__title');
      const profileDescription = document.querySelector('.profile__description');
      // Вставьте новые значения с помощью textContent
      profileTitle.textContent = nameValue;
      profileDescription.textContent = jobValue;
      // closeCurrentPopup()
      nameInput.value = null;
      jobInput.value = null;
      closePopup(popupTypeEdit)
    })
    .catch(error => console.error(error))
    .finally(()=> {
      button.textContent = 'Сохранить'
    })
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormEditSubmit);
formElementNew.addEventListener('submit', handleFormNewSubmit);
formElementAvatar.addEventListener('submit', handleFormNewAvatar)


function handleFormNewSubmit (evt) {
  evt.preventDefault();

  const newNameInput = document.querySelector('.popup__input_type_card-name')
  const linkInput = document.querySelector(".popup__input_type_url")
  const name = newNameInput.value;
  const link = linkInput.value;
  const data = {
    name: name,
    link: link
  }
  const button = evt.target.querySelector('.button');
  button.textContent = 'Сохранение...';

  addCard(name, link)
    .then(data => {
        const card = createCard(data, onDelete, handleHeartClick, handleOnImageClick, userId);
        cardsContainer.insertBefore(card, cardsContainer.firstChild)
        newNameInput.value = null;
        linkInput.value = null;
        closePopup(evt.target.closest(".popup"))
    })
    .catch(error => console.error(error))
    .finally(()=> {
      button.textContent = 'Сохранить'
    })
}

function handleFormNewAvatar (evt) {
  evt.preventDefault();
  const linkInput = document.querySelector(".avatar_link")
  const link = linkInput.value;
  const data = {
    link: link
  }
  const button = evt.target.querySelector('.button');
  button.textContent = 'Сохранение...';
  editAvatar(link)
    .then((data) => {
      avatar.style.backgroundImage = `url(${link})`;
      linkInput.value = null;
      closePopup(evt.target.closest(".popup"))
    })
    .catch(error => console.error(error))
    .finally(()=> {
      button.textContent = 'Сохранить'
    })
}



function handleOnImageClick (link, name) {
  const imageLink = link;
  const nameCardDesc = name;

  openPopup(popupTypeImage)
  popupTypeImageImg.src = imageLink;
  popupTypeImageP.textContent = nameCardDesc
}

  enableValidation(validationConfig); 

function updateHeader (data) {
  avatar.style.backgroundImage = `url(${data.avatar})`;
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
}

meInfo()
  .then((medata) => {
    userId = medata._id
    updateHeader(medata)

    cards()
      .then(carddata => outputInitialCards(carddata))
      .catch(error => console.error(error))
  })
  .catch(error => console.error(error))