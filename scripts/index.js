/* Выбор необходимых DOM-элементов */

//попапы
const popupEditProfile = document.querySelector('.popup_type_edit-form');
const popupCreateCard = document.querySelector('.popup_type_card-form');
const popupBigImage = document.querySelector('.popup_type_big-image');

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

//кнопка удаления карточки
const cardDeleteButton = document.querySelector('.card__delete-button');




/* Содержимое дефолтных карточек */

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 
  

/* Открыть popup */

function openPopup(popup) {
    updateInputValue();
    popup.classList.add('popup_opened');   
};

popupEditProfileOpenButton.addEventListener('click', function() {
    openPopup(popupEditProfile);
});
popupCreateCardOpenButton.addEventListener('click', function () {
    openPopup(popupCreateCard);
});





/* Закрыть popup */

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

popupEditProfileCloseButton.addEventListener('click', function() {
    closePopup(popupEditProfile);
});
popupCreateCardCloseButton.addEventListener('click', function() {
    closePopup(popupCreateCard);
});

popBigImageCloseButton.addEventListener('click', function () {
    closePopup(popupBigImage);
});

/* Обновление value в зависимости от содержимого профиля */

function updateInputValue() {

    nameInput.setAttribute('value', profileName.textContent);  
    jobInput.setAttribute('value', profileJob.textContent);

}

/* Отправка формы редактирования профиля */

function formEditProfileSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup(popupEditProfile);
}

formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);


/* Создание шаблона карточки */

function createCard(name, link) {
    const cardTemplate = document.querySelector('.card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').setAttribute('src', link);
    cardElement.querySelector('.card__title').textContent = name;
    
 
    cardElement.querySelector('.card__like-button').addEventListener('click', function(evt) {
        evt.target.classList.toggle('card__like-button_active'); //лайк
    });

    cardElement.querySelector('.card__delete-button').addEventListener('click', function(evt) {
        evt.target.closest('.card').remove(); // удаление карточки

    });

    cardElement.querySelector('.card__image').addEventListener('click', function () {
        openPopup(popupBigImage); 
        imageDisplay(link, name);
    });



    return cardElement;
}

function renderCard(data, isAppend) {
    const element = createCard(data.name, data.link);
    if (isAppend == true) {
        container.append(element);
    }
    else {
        container.prepend(element); 
    }
}

initialCards.forEach((data) => {
    renderCard(data, true);
});


/* Отправка формы для создания новой карточки */
function formCreateCardSubmitHandler (evt) {
    evt.preventDefault();
    const data = new Object();
    data.name =  titleInput.value;
    data.link = imageInput.value;
    renderCard(data, false);
    closePopup(popupCreateCard);
}

formCreateCard.addEventListener('submit', formCreateCardSubmitHandler);



/* Увеличенрие картинки */
function imageDisplay (link, name){
    popupBigImage.querySelector('.popup__big-image').setAttribute('src', link);
    popupBigImage.querySelector('.popup__title').textContent = name;
}








