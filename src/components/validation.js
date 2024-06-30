  export const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  console.log(errorElement)
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    // errorElement.classList.add('.popup__error_visible');
  };
  
  export const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    // errorElement.classList.remove('.popup__error_visible');
    errorElement.textContent = '';
  };
  
  export const isValid = (formElement, inputElement, validationConfig) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
      } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
      // Если проходит, скроем
      hideInputError(formElement, inputElement, validationConfig);
    }
  };
  

  export const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, validationConfig)
        toggleButtonState(inputList, buttonElement);
      });
    });
  }; 
  
  export const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement, validationConfig);
    });
  };

   const hasInvalidInput = (inputList) => {
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
  
  export function clearValidation(formElement, validationConfig) {
    // Очистка ошибок валидации
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector))
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)
    inputList.forEach(input => hideInputError(formElement, input, validationConfig))
    toggleButtonState(inputList, buttonElement);
  }
