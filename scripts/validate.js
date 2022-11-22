const selectors = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__save-button',
    errorSelector: '.form__input-error',
    errorClass: 'form__input-error_active',
    submitButtonInactiveClass: 'form__save-button_inactive',
    inputInvalidClass: 'form__item_invalid'
}

// проверка валидности формы
function checkInputValidity(inputElement, selectors) {
    isValid = inputElement.validity.valid;
    
    const errorElement = getErrorElement(inputElement);
    
    if (isValid) {
        hideInputError(inputElement, selectors);
    }
    else {
        showInputError(errorElement, inputElement.validationMessage, inputElement, selectors);
    }
}

// поиск элемента ошибки
function getErrorElement(inputElement) {
    const inputName = inputElement.getAttribute('name');
    const errorElement = document.getElementById(`${inputName}-error`);
    return errorElement;
}

// показать ошибку
function showInputError(errorElement, errorMessage, inputSelector, selectors) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
    inputSelector.classList.add(selectors.inputInvalidClass);
}

//спрятать ошибку
function hideInputError(inputElement, selectors) {
    inputElement.classList.remove(selectors.inputInvalidClass);
    errorElement = getErrorElement(inputElement);
    errorElement.textContent = '';
    errorElement.classList.remove(selectors.errorClass);
}
    
// сбросить ошибку
function disableError(popup, selectors) {
    const inputList = Array.from(popup.querySelectorAll(selectors.inputSelector));
        inputList.forEach(inputElement => {
            hideInputError(inputElement, selectors);
        });
}

// заблокировать кнопку сабмита
function disableSubmitButton (submitButton, selectors) {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add(selectors.submitButtonInactiveClass);
}

// переключение кнопки сабмита
function toggleSubmitButton (inputList, submitButton, selectors) {
    const hasInvalidInput = inputList.some(inputElement => !inputElement.validity.valid);

    if (hasInvalidInput) {
        submitButton.setAttribute('disabled', true);
        disableSubmitButton(submitButton, selectors);
    }
    else {
        submitButton.removeAttribute('disabled');
        submitButton.classList.remove(selectors.submitButtonInactiveClass);
    }
}

// обработчики событий
function setEventListeners(formElement, selectors) {
    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const submitButton = formElement.querySelector(selectors.submitButtonSelector);

    toggleSubmitButton(inputList, submitButton, selectors);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(inputElement, selectors);
            toggleSubmitButton(inputList, submitButton, selectors);
        });
    });
}

// функция валидации формы
function enableValidation (selectors) {
    const formList = document.querySelectorAll(selectors.formSelector);

    formList.forEach(formElement => {
        setEventListeners(formElement, selectors);
    });

}
