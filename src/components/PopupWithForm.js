import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputElements = this._popupElement.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    const data = {};
    Array.from(this._inputElements).forEach(function (input) {
      data[input.name] = input.value;
    });
    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}

//index.js
//const newCardPopup = new PopupWithForm("#add-card-modal", (handleFormSubmit) => {});
