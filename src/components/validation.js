  export const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  console.log(errorElement)
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    // errorElement.classList.add('.popup__error_visible');
  };
  
  export const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    // errorElement.classList.remove('.popup__error_visible');
    errorElement.textContent = '';
  };
  
  export const isValid = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
      } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      // Если проходит, скроем
      hideInputError(formElement, inputElement);
    }
  };
  

  export const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement)
        toggleButtonState(inputList, buttonElement);
      });
    });
  }; 
  
  export const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement);
    });
  };

  export const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 
  
  export const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
          buttonElement.disabled = true;
      buttonElement.classList.add('popup__button_disabled');
    } else {
          // иначе сделай кнопку активной
          buttonElement.disabled = false;
      buttonElement.classList.remove('popup__button_disabled');
    }
  }; 
  
  // export function clearValidation(formElement) {
  //   // Очистка ошибок валидации
  //   hideInputError(formElement, inputElement);
  //   toggleButtonState(inputList, buttonElement);
  // }
