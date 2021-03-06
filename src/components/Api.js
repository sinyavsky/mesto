export default class Api {

  constructor({baseUrl, token}) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  _makeRequest({method, path, contentType=null, body=null}) {     
    const options = {
      method: method,
      headers: {
        authorization: this.token
      }
    };

    if(contentType) {
      options.headers['Content-Type'] = contentType;
    }

    if(body) {
      options.body = body;
    }

    return fetch(this.baseUrl + path, options)
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
      });    
  }  


  // пользователь

  getUserInfo() {
    return this._makeRequest({
      method: 'GET',
      path: '/users/me'
    });
  }

  patchUserInfo({name, about}) {
    return this._makeRequest({
      method: 'PATCH',
      path: '/users/me',
      contentType: 'application/json',
      body: JSON.stringify({
        name: name,
        about: about
      })
    });    
  }

  patchUserAvatar(ava) {
    return this._makeRequest({
      method: 'PATCH',
      path: '/users/me/avatar',
      contentType: 'application/json',
      body: JSON.stringify({
        avatar: ava
      })
    });    
  }  


  // карточки

  getInitialCards() {
    return this._makeRequest({
      method: 'GET',
      path: '/cards'
    });
  }  

  postCard({name, link}) {
    return this._makeRequest({
      method: 'POST',
      path: '/cards',
      contentType: 'application/json',
      body: JSON.stringify({
        name: name,
        link: link
      })
    }); 
  }

  deleteCard(id) {
    return this._makeRequest({
      method: 'DELETE',
      path: `/cards/${id}`
    });     
  }


  // лайки
  
  deleteLike(cardId) {
    return this._makeRequest({
      method: 'DELETE',
      path: `/cards/likes/${cardId}`
    });      
  }

  putLike(cardId) {
    return this._makeRequest({
      method: 'PUT',
      path: `/cards/likes/${cardId}`
    });      
  }  
  
}