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