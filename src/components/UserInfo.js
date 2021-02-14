export default class UserInfo {

  constructor({nameSel, bioSel, avaSel}) {
    this._name = document.querySelector(nameSel);
    this._bio = document.querySelector(bioSel);
    this._ava = document.querySelector(avaSel);
  }

  getUserInfo() {
    return {name: this._name.textContent, bio: this._bio.textContent}
  }

  setUserInfo({name, bio, ava}) {
    this._name.textContent = name;
    this._bio.textContent = bio;
    this._ava.src = ava;
  }

}