/* Выбор необходимых DOM-элементов */

const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');

const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__item_element_name');
const jobInput = formElement.querySelector('.form__item_element_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');


/* Функция инициализации */

function init() {
    popupOpenButton.addEventListener('click', openPopup);
    popupCloseButton.addEventListener('click', closePopup);
    formElement.addEventListener('submit', formSubmitHandler); 
    
}


/* Открыть popup */

function openPopup() {
    updateInputValue();
    popup.classList.add('popup_opened');
    
}


/* Закрыть popup */

function closePopup() {
    popup.classList.remove('popup_opened');
}


/* Обновление value в зависимости от содержимого профиля */

function updateInputValue() {

    nameInput.setAttribute('value', profileName.textContent);  
    jobInput.setAttribute('value', profileJob.textContent);

}

/* Отправка формы */

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup();
}


init();


