export default class UserInfo {

  constructor({nameSel, bioSel, avaSel}) {
    this._name = document.querySelector(nameSel);
    this._bio = document.querySelector(bioSel);
    this._ava = document.querySelector(avaSel);
  } 

  // терминология в контексте класса:
  // Data = вся инфа о пользователе
  // Info = имя + био

  initUserData(data) {   
    this._id = data._id;    
    this._ava.src = data.avatar;
    this.updateUserInfo(data.name, data.about);
  }

  updateUserInfo(name, bio) { 
    this._name.textContent = name;
    this._bio.textContent = bio;
    this._ava.alt = `${name} - фото профиля`;    
  }

  getUserInfo() {
    return {
      name: this._name.textContent, 
      bio: this._bio.textContent
    }
  }    

}