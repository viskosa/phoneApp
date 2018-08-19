/*
TASK 2 -------DONE-------------------
phone-app. Первая страница.
Загружайте пользователей с сервера при загрузке странице.
*/

/*-----------DONE------------------------
// contentEditable
Сделайте, чтобы на странице add-user.html пользователь  
добавлялся на сервер.
/*
Добавить возможность из формы, ДОБАВЛЯТЬ Пользователя на сервер
add-user
*/

// Для PhoneBook сделайте отдельный репозиторий + gh-pages

// Рекомендую - вам необходимо сделать 1 метод(или отдельный класс)
// который будет отправлять запросы
// доступ к этому сервису должен быть в каждом вашем классе
// url - должен быть константа, т.к url у вас изменяться не будет.cons

// все запросы к серверу вот здесь

class Api {
  constructor(url) {
    this.url = url;
  }

  requestUsers() {
    return fetch(this.url).then(data => data.json());
  }

  postUser(arr) {
    const [fullName, email, phone] = arr;
    //console.log(arr);
    return fetch(this.url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        phone: phone
      })
    });
  }

  patchUser(arr, id) {
    const [fullName, email, phone] = arr;
    //console.log(arr, id);
    return fetch(this.url + `/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        phone: phone
      })
    });
  }

  deleteUser(id) {
    return fetch(this.url + `/${id}`, { method: "DELETE" });
  }
}

export {Api};