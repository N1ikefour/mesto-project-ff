


const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-16',
  headers: {
    authorization: '3ec1fb29-0e21-48db-8dd8-95c411f1acd1',
    'Content-Type': 'application/json'
  }
}
  

export function meInfo () {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(data => {
    console.log(data)
    return data
  })
}

export const cards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(data => {
    console.log(data)
    return data
  })
}



export const editProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    about: about
  })
  }) 
  .then (res => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(data => {
    console.log(data)
    return data
  })
}


export const addCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
  method: 'POST',
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    link: link
  })
  })
  .then(res => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(data => {
    console.log(data)
    return data
  })
}

export const deleteCardServ = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
  method: 'DELETE',
  headers: config.headers,
  })
  .then (res => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(data => {
    console.log(data)
    return data
  })
}

export const likeCard = (id, method) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
  method: method,
  headers: config.headers,
  })
  .then (res => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(data => {
    console.log(data)
    return data
  })
}

export const editAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    avatar: avatar
  })
  }) 
  .then (res => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(data => {
    console.log(data)
    return data
  })
}



