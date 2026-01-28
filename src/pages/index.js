import Card from "../components/Card.js";
import "./index.css";
import FormValidator from "../components/FormValidator";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, validationSettings } from "../utils/Constants.js";
import api from "../utils/Api.js";

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Wrappers
const cardListEl = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileFormElement = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const imageViewModal = document.querySelector("#view-image-modal");

// Buttons and Other DOM Nodes
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileModalCloseBtn = profileEditModal.querySelector(
  "#profile-modal-close-button",
);
const addNewCardBtn = document.querySelector("#profile-add-button");
const addNewCardModalCloseBtn = addCardModal.querySelector(
  "#add-card-modal-close-button",
);

// Form Data
const profileNameInput = document.querySelector("#edit-profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#edit-profile-description-input",
);
const cardTitleInput = addCardFormElement.querySelector(
  "#add-card-title-input",
);
const cardUrlInput = addCardFormElement.querySelector("#add-card-url-input");
const imageViewTitleEl = imageViewModal.querySelector(
  "#view-image-modal-title",
);
const imageViewImgEl = imageViewModal.querySelector("#view-image-modal-pic");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

const formCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit,
);
formCardPopup.setEventListeners();

const formProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit,
);
formProfilePopup.setEventListeners();

const imagePopup = new PopupWithImage("#view-image-modal");
imagePopup.setEventListeners();

// New Line of Code
const renderCard = (data) => {
  const card = new Card(
    data,
    "#card-template",
    imagePopup.open.bind(imagePopup),
    //Delete handler
    (cardInstance) => {
      api
        .deleteCard(cardInstance.getId())
        .then(() => {
          cardInstance.remove();
        })
        .catch((err) => console.error(err));
    },
    // Like toggle handler
    (cardInstance) => {
      const willLike = !cardInstance.isLiked();
      const req = willLike
        ? api.addLike(cardInstance.getId())
        : api.removeLike(cardInstance.getId());

      req
        .then((updatedCard) => {
          cardInstance.setLiked(updatedCard.isLiked);
        })
        .catch((err) => console.error(err));
    },
  );
  return card.getView();
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileFormElement,
);
const addFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement,
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */
const cardRendering = new Section(initialCards, renderCard, ".cards__list");
cardRendering.renderItems();

const userInfo = new UserInfo(".profile__name", ".profile__description");

function handleProfileEditSubmit(data) {
  formProfilePopup.renderLoading(true); // Show loading

  api
    .updateUserInfo({ name: data.name, about: data.description })
    .then((user) => {
      userInfo.setUserInfo({ name: user.name, description: user.about });
      formProfilePopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => formProfilePopup.renderLoading(false)); // hides loading
}

function handleAddCardFormSubmit(data) {
  formCardPopup.renderLoading(true); // Show loading

  api
    .addCard({ name: data.title, link: data.link })
    .then((card) => {
      const cardElement = renderCard(card);
      cardRendering.addItem(cardElement);
      formCardPopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => formCardPopup.renderLoading(false));
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    // Set user info
    userInfo.setUserInfo({ name: user.name, description: user.about });

    // Store user ID for later use
    window.currentUserId = user._id;

    // Render cards from server
    cards.forEach((card) => {
      const cardElement = renderCard(card);
      cardRendering.addItem(cardElement);
    });
  })
  .catch(console.error);
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

//* Profile Edit
profileEditBtn.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileDescriptionInput.value = description;
  formProfilePopup.open();
});

//* add new card
addNewCardBtn.addEventListener("click", () => formCardPopup.open());
