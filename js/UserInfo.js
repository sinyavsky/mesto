export default class UserInfo {

  constructor({nameSel, bioSel}) {
    this._name = document.querySelector(nameSel);
    this._bio = document.querySelector(bioSel);
  }

  getUserInfo() {
    return {name: this._name.textContent, bio: this._bio.textContent}
  }

  setUserInfo({name, bio}) {
    this._name.textContent = name;
    this._bio.textContent = bio;
  }

}