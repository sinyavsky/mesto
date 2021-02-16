export default class Api {
  constructor({baseUrl, token}) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  _getData(path) {
    return fetch(this.baseUrl + path, {
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
    });    
  }

  getUserInfo() {
    return this._getData('/users/me');
  }

  getInitialCards() {
    return this._getData('/cards');
  }

  patchUserInfo({name, about}) {
    return fetch(`${this.baseUrl}/users/me`, {
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
    });    
  }

  postCard({name, link}) {
    return fetch(`${this.baseUrl}/cards`, {
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
    });
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  }

  putLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this.token,
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  }

  deleteLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  }

  patchUserAvatar(ava) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: ava
      })
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });    
  }
}