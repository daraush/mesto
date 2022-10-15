/* Выбор необходимых DOM-элементов */

const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');

const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__item_element_name');
const jobInput = formElement.querySelector('.form__item_element_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

init();


/* Функция инициализации */

function init() {
    popupOpenButton.addEventListener('click', openPopup);
    popupCloseButton.addEventListener('click', closePopup);
    formElement.addEventListener('submit', formSubmitHandler); 
    
}


/* Открыть popup */

function openPopup() {
    updatePlaceholder();
    popup.classList.add('popup_opened');
    
}


/* Закрыть popup */

function closePopup() {
    popup.classList.remove('popup_opened');
}


/* Обновление placeholder в зависимости от содержимого профиля */

function updatePlaceholder() {

    let profileNameText = profileName.innerText;
    let profileJobText = profileJob.innerText;

    nameInput.setAttribute('placeholder', profileNameText);  
    jobInput.setAttribute('placeholder', profileJobText);

    nameInput.value = "";  // Очищение формы nameInput
    jobInput.value = "";

}

/* Отправка формы */

function formSubmitHandler (evt) {
    evt.preventDefault();
    let profileNameText = nameInput.value;
    let profileJobText = jobInput.value;

    profileName.textContent = profileNameText;
    profileJob.textContent = profileJobText;

    closePopup();
}



