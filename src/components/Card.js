export default class Card {
  constructor(data, cardSelector, openImgModal) {
    this._name = data.title;
    this._link = data.url;
    this._cardSelector = cardSelector;
    this._modalOpen = openImgModal;
    this._id = data._id;
    this._isLiked = Boolean(data.isLiked);
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeToggle = handleLikeToggle;
  }

  _setEventListeners() {
    //"#view-image-modal"
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });

    //".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", (evt) => {
        this._handleLikeIcon(evt);
      });

    //".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
  }

  _handleLikeIcon(evt) {
    evt.target.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleImageClick() {
    const data = {
      name: this._name,
      link: this._link,
    };
    this._modalOpen(data);
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
  setLiked(isLiked) {
    this._isLiked = Boolean(isLiked);
    const likeButton = this._cardElement.querySelector(".card__like-button");
    if (likeButton) {
      likeButton.classList.toggle("card__like-button_active", this._isLiked);
    }
  }

  isLiked() {
    return this._isLiked;
  }

  getId() {
    return this._id;
  }

  remove() {
    if (this._cardElement) {
      this._cardElement.remove();
      this._cardElement = null;
    }
  }
}
