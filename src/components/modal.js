import {clearValidation} from "./validation"

export const closePopup = function (popup, validationConfig) {
  const form = popup.querySelector(validationConfig.formSelector)
  popup.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', closePopupByEsc);
  if (form)
    clearValidation(form, validationConfig)
}

export function openPopup(popup, validationConfig) {
  popup.classList.add('popup_is-animated');  
  popup.classList.add("popup_is-opened")
  document.addEventListener('keydown', (evt) => closePopupByEsc(evt, validationConfig));
}


export function closeCurrentPopupByOverlay(evt) {
  if (evt.currentTarget === evt.target)
  closePopup(evt.currentTarget)
}

 function closePopupByEsc(evt, validationConfig) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup, validationConfig);
    }
  }
}






