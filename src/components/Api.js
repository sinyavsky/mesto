export default class Api {
  constructor({baseUrl, token}) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  _getData(path, onSuccess, onFailure) {
    fetch(this.baseUrl + path, {
      method: 'GET',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    })
    .then(result => onSuccess(result))
    .catch(err => onFailure(err)); 
  }

  getUserInfo(onSuccess, onFailure) {
    this._getData('/users/me', onSuccess, onFailure);
  }

  getInitialCards(onSuccess, onFailure) {
    this._getData('/cards', onSuccess, onFailure);
  }

  patchUserInfo({name, about}, onSuccess, onFailure) {
    fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    })
    .then(result => onSuccess(result))
    .catch(err => onFailure(err)); 
  }

  postCard({name, link}, onSuccess, onFailure) {
    fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    })
    .then(result => onSuccess(result))
    .catch(err => onFailure(err)); 
  }
}