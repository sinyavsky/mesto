export default class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getUserInfo(onSuccess, onFailure) {
    fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    })
    .then((result) => {
      onSuccess({
        name: result.name,
        bio: result.about,
        ava: result.avatar        
      });
    })
    .catch((err) => {
      onFailure(err);
    }); 
  }
}