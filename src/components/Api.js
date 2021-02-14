export default class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _getData(path, onSuccess, onFailure) {
    fetch(this.baseUrl + path, {
      headers: this.headers
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
}