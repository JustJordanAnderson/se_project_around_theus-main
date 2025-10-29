import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = this._popupElement.querySelector(".modal__image");
    this._imagtTitle = this._popupElement.querySelector(
      ".modal__view_image-title"
    );
  }

  open(data) {
    this._image.src = data.link;
    this._image.alt = data.name;
    this._imagtTitle.textContent = data.name;
    super.open();
  }
}
//index.js
//const newCardPopup = new PopupWithForm("#add-card-modal", (handleFormSubmit) => {});
