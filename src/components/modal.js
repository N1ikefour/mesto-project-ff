export const closePopup = function (popup) {
  popup.classList.remove("popup_is-opened");
  console.log(popup)
}
export function openPopup(popup) {
  popup.classList.add('popup_is-animated');  
  popup.classList.add("popup_is-opened")
}

export function closeCurrentPopupByOverlay(evt) {
  if (evt.currentTarget === evt.target)
  closePopup(evt.currentTarget)
}

export function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}




