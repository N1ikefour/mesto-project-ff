


  const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-16',
  headers: {
    authorization: '3ec1fb29-0e21-48db-8dd8-95c411f1acd1',
    'Content-Type': 'application/json'
  }
}



// export function cardsserv () {
//   return fetch(`${config.baseUrl}/cards`, {
//     headers: config.headers
//   })
//   .then(res => {
//     if (res.ok) {
//      return res.json();
//     }

//     return Promise.reject(`Ошибка: ${res.status}`);
//   })
//   .then ((res) => {
//     console.log('cardserv', res)
//   })
  
// }
  

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
}



export const Editprofile = (name, about) => {
  fetch(`${config.baseUrl}/users/me`, {
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
  .then (data => console.log(data))
}


export const addcard = (name, link) => {
  fetch(`${config.baseUrl}/cards`, {
  method: 'POST',
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    link: link
  })
  })
  .then (res => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then (data => console.log(data))
}

export const deleteCardServ = (id) => {
  fetch(`${config.baseUrl}/cards/${id}`, {
  method: 'DELETE',
  headers: config.headers,
  })
  .then (res => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then (data => console.log(data))
}

export const likecard = (id, method) => {
  fetch(`${config.baseUrl}/cards/likes/${id}`, {
  method: method,
  headers: config.headers,
  })
  .then (res => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then (data => console.log(data))
}

export const Editavatar = (avatar) => {
  fetch(`${config.baseUrl}/users/me/avatar`, {
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
  .then (data => console.log(data))
}



