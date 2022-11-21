/* Выбор необходимых DOM-элементов */

//попапы
const popupEditProfile = document.querySelector('.popup_type_edit-form');
const popupCreateCard = document.querySelector('.popup_type_card-form');
const popupBigImage = document.querySelector('.popup_type_big-image');
const popups = document.querySelectorAll('.popup');


//кнопки вызова попапов
const popupEditProfileOpenButton = document.querySelector('.profile__edit-button');
const popupCreateCardOpenButton = document.querySelector('.profile__add-button');

//кнопки закрытия попапов 
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close-button');
const popupCreateCardCloseButton = popupCreateCard.querySelector('.popup__close-button');
const popBigImageCloseButton = popupBigImage.querySelector('.popup__close-button');


//элементы формы для редактирования профиля
const formEditProfile = document.querySelector('.form_edit-profile');
const nameInput = formEditProfile.querySelector('.form__item_element_name');
const jobInput = formEditProfile.querySelector('.form__item_element_job');

//элементы профиля
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//элементы формы для создания карточки
const formCreateCard = document.querySelector('.form_create-card');
const titleInput = formCreateCard.querySelector('.form__item_element_place-title');
const imageInput = formCreateCard.querySelector('.form__item_element_place-link');


//контейнер для шаблона карточки
const container = document.querySelector('.grid');

/* Открыть popup */

function openPopup(popup) {
    popup.classList.add('popup_opened');   
};

/* Закрыть popup */

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

/* Закрыть попап кликом по оверлею */
function closePopupByOverlay(event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    popups.forEach(popup => {
        closePopup(popup);
    });  
}

/* Закрыть попап по Esc */
function closePopupByEsc(event) {
    
    if (event.key === 'Escape')  {
        popups.forEach(popup => {
            closePopup(popup);
        });
    }
  }

/* Обработчики закрытия попапа */

function addCloseEvents(popupElement) {
    popupElement.querySelector('.popup__close-button').addEventListener('click', function() {
        closePopup(popupElement);
    });
    popupElement.addEventListener('click', closePopupByOverlay);
}

/* Обновление value в зависимости от содержимого профиля */

function fillProfilePopupInputs() {
    nameInput.value = profileName.textContent;  
    jobInput.value = profileJob.textContent;

}

/* Отправка формы редактирования профиля */

function formEditProfileSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup(popupEditProfile);
}

/* Создание шаблона карточки */

function createCard(name, link) {
    const cardTemplate = document.querySelector('.card-template').content.querySelector('.card');
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__image').setAttribute('src', link);
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').setAttribute('alt', name);
 
    cardElement.querySelector('.card__like-button').addEventListener('click', function(evt) {
        evt.target.classList.toggle('card__like-button_active'); //лайк
    });

    cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
        cardElement.remove(); // удаление карточки

    });

    cardElement.querySelector('.card__image').addEventListener('click', function () {
        openPopup(popupBigImage); 
        displayBigImagePopup(link, name);
    });

    return cardElement;
}

function renderCard(data, isAppend) {
    const element = createCard(data.name, data.link);
    if (isAppend) {
        container.append(element);
        return;
    }
    container.prepend(element); 
    
}

/* Отправка формы для создания новой карточки */
function formCreateCardSubmitHandler(event) {
    event.preventDefault();
    const data = { name:  titleInput.value, link: imageInput.value };
    renderCard(data);
    closePopup(popupCreateCard);
    formCreateCard.reset();
}

/* Увеличенрие картинки */
function displayBigImagePopup (link, name){
    popupBigImage.querySelector('.popup__big-image').setAttribute('src', link);
    popupBigImage.querySelector('.popup__big-image').setAttribute('alt', name);
    popupBigImage.querySelector('.popup__title').textContent = name;
    document.addEventListener('keydown', closePopupByEsc);
    
}


/* Функция инициализации */
function init() {
    popups.forEach(popup => {
        addCloseEvents(popup);
    });

    initialCards.forEach((data) => {
        renderCard(data, true);
    });

    formCreateCard.addEventListener('submit', formCreateCardSubmitHandler);
    formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);

    enableValidation(selectors);

    popupEditProfileOpenButton.addEventListener('click', function() {
        openPopup(popupEditProfile);
        document.addEventListener('keydown', closePopupByEsc);
        fillProfilePopupInputs();
        disableSubmitButton(popupEditProfile.querySelector(selectors.submitButtonSelector), selectors);
        disableError(popupEditProfile, selectors);
    });

    popupCreateCardOpenButton.addEventListener('click', function () {
        openPopup(popupCreateCard);
        document.addEventListener('keydown', closePopupByEsc);
        disableSubmitButton(popupCreateCard.querySelector(selectors.submitButtonSelector), selectors);
        disableError(popupCreateCard, selectors);   
    });
}

init();
