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


// Add to constructor (after existing code):
constructor(popupSelector, handleFormSubmit) {
  super({ popupSelector });
  this._popupForm = this._popupElement.querySelector(".modal__form");
  this._handleFormSubmit = handleFormSubmit;
  this._inputElements = this._popupElement.querySelectorAll(".modal__input");
  
  // NEW: Add these lines
  this._submitButton = this._popupElement.querySelector(".modal__button");
  this._defaultSubmitText = this._submitButton
    ? this._submitButton.textContent
    : "";
}

// NEW: Add this method
renderLoading(isLoading, loadingText = "Saving...") {
  if (!this._submitButton) return;

  if (isLoading) {
    this._submitButton.textContent = loadingText;
    this._submitButton.disabled = true;
    Array.from(this._inputElements).forEach((i) => (i.disabled = true));
  } else {
    this._submitButton.textContent = this._defaultSubmitText;
    this._submitButton.disabled = false;
    Array.from(this._inputElements).forEach((i) => (i.disabled = false));
  }
}

// MODIFY: Update close method to reset loading state
close() {
  super.close();
  this._popupForm.reset();
  this.renderLoading(false); // NEW: Add this line
}
}
