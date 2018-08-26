//index.html/contacts.html - в поле search при вводе буквы, +
//добавить поиск по имени если имя включает хотя бы одну эту букву. +
//после ввода каждого символа, фильтровать отображаемых пользователей.  +
//При удалении всех символов отобразить снова весь список +

//this.state.formattedPeople == array with splitted fullName property

"use strict";

class ContactsPage {
  constructor(globalState) {
    this.state = globalState;

    this.title = "Contacts";
    this.tableCaptions = ["Name", "Last name", "Email"];
  }

  reRenderTable(arr) {
    // сделать, чтобы это был один метод рендера и лежал он в app.js
    let tableBody = this.createTableBodyRow(arr);

    let pattern = `<tbody>
                      ${tableBody}
                   </tbody>`;

    let parent = document.querySelector("table");
    let shouldBeReplaced = document.querySelector("tbody");
    parent.removeChild(shouldBeReplaced);

    parent.insertAdjacentHTML("beforeEnd", pattern);
  }

  createTableHeadRow(arr) {
    let items = arr
      .map(item => {
        return `<th>${item}</th>`;
      })
      .join("");

    return `<tr>
                  ${items}
            </tr>`;
  }

  createTableBodyRow(arr) {
    if (!arr) {
      arr = this.state.people;
    }

    return arr
      .map(item => {
        const [name, surname] = item.fullName.split(" ");

        return `<tr data-id="${item._id}">
                <td>${name}</td>
                <td>${surname}</td>
                <td>${item.email}</td>
              </tr>`;
      })
      .join("");
  }

  sortColumnsHandler() {
    let parent = document.querySelector("thead");
    parent.addEventListener("click", this.sortColumns.bind(this));
  }

  sortColumns() {
    let target = event.target;

    this.tableCaptions.forEach(item => {
      if (target.textContent == item) {
        item = this.makeCamelCase(item);

        let sorted = this.sortUsers(item);
        //console.log(sorted);
        this.reRenderTable(sorted);
      }
    });
  }

  sortUsers(str) {
    function compare(a, b) {
      if (isNaN(a[str])) {
        if (a[str] > b[str]) {
          return 1;
        }
        if (a[str] < b[str]) {
          return -1;
        }
        if (a[str] == b[str]) {
          return 0;
        }
      } else {
        return a[str] - b[str];
      }
    }

    return this.state.formattedPeople.sort(compare);
  }

  makeCamelCase(str) {
    str = str.toLowerCase();

    if (str.includes(" ")) {
      //'last name'
      let arr = str.split(" "); //['last', 'name']

      let capitalizedArr = arr.map((item, i) => {
        if (i > 0) {
          let itemToArray = item.split(""); //['n', 'a', 'm', 'e']
          let firstLetter = itemToArray[0].toUpperCase();
          itemToArray.splice(0, 1, firstLetter);
          return itemToArray.join("");
        }
        return item;
      }); // end of map

      str = capitalizedArr.join("");
    }

    return str;
  }

  searchUserHandler() {
    this.searchField = document.querySelector("#search");
    this.searchField.addEventListener("input", this.filterUser.bind(this));
  }

  filterUser() {
    let value = this.searchField.value.toLowerCase();

    let filteredUsers = this.state.formattedPeople.filter(item => {
      //let name = item.fullName.split(" ")[0];
      if (item.name.toLowerCase().includes(value)) {
        return item;
      }

      return;
    });
    //console.log(filteredUsers);

    this.reRenderTable(filteredUsers);
  }

  selectUserHandler() {
    let parent = document.querySelector("tbody");
    parent.addEventListener("click", this.selectUser.bind(this));
  }

  selectUser(e) {
    let target = e && e.target;

    if (target.tagName === "TD") {
      let row = target.closest("tr");
      let id = row.dataset.id;
      this.state.people.forEach(item => {
        if (item._id == id) {
          this.state.selectedUser = item;
        }
      });
      console.log(this.state.selectedUser);
    }
  }

  setHandlers() {
    this.sortColumnsHandler();
    this.searchUserHandler();
    this.selectUserHandler();
  }

  render(users) {
    return `
      <header class="header">
        <div class="container top-radius">
          <h2>${this.title}</h2>
        </div>
      </header>

      <main>
        <div class="container mainDiv">
          <form class="form-inline search-form">
            <div class="form-group">
              <label class="sr-only" for="search">Search</label>
              <input type="text" class="form-control" id= "search" placeholder="Search">
            </div>
          </form>

          <table class="table table-hover contacts">
            <thead>
              ${this.createTableHeadRow(this.tableCaptions)}
            </thead>
            <tbody>
              ${this.createTableBodyRow(users)}
            </tbody>
          </table>

        </div>
      </main>`;
  }
}

export { ContactsPage };
