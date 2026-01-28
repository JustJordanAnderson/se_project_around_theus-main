export default class UserInfo {
  constructor(profileName, profileDescription) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
  }

  getUserInfo() {
    const userIdentity = {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    };
    return userIdentity;
  }
  setUserInfo(data) {
    this._nameElement.textContent = data.name || data.title;
    this._aboutElement.textContent = data.description || data.about;
  }
}
// setUserInfo(userIdentity) {
//   this._profileName.textContent = userIdentity.name;
//   this._profileDescription.textContent = userIdentity.description;
// }
