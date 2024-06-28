import {clearValidation} from "./validation"
export const closePopup = function (popup, validationConfig) {
  console.log(popup, popup.querySelector(validationConfig.formSelector))
  const form = popup.querySelector(validationConfig.formSelector)
  popup.classList.remove("popup_is-opened");
  console.log(popup)
  document.removeEventListener('keydown', closePopupByEsc);
  clearValidation(form, validationConfig)
}
export function openPopup(popup) {
  popup.classList.add('popup_is-animated');  
  popup.classList.add("popup_is-opened")
  document.addEventListener('keydown', closePopupByEsc);
}


export function closeCurrentPopupByOverlay(evt) {
  if (evt.currentTarget === evt.target)
  closePopup(evt.currentTarget)
}

 function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}




