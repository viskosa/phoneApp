//Нужно визуализировать keypad.html - keypad.js

//Структура виртуализации:
// ------ Это 2 разных класса KeypadPage, ContactsPage  -----

//innerHTML по максимуму
//https://aleksandra-maslennikova.github.io/telephone-book/keypad.html

//Сделайте чтобы при нажатии на кнопку цифра отобразилась +
//в <span class="numbers">

//https://aleksandra-maslennikova.github.io/telephone-book/index.html
//По клику по заголовку таблицы,
//таблица сортировалась по соответствующему свойству  +

//добавить функционал для удаления номера +
//1. keypad - сделать чтобы номер можно было набрать с клавиатуры (!) +
//2. Формат номера должен быть таким (099)-17-38-170  -

class KeypadPage {
  constructor(globalState) {
    this.state = globalState; //стал равен this.state-у со страницы App.js
    this.title = "Keypad";
  }

  buttonsHandler() {
    let buttonsParent = document.querySelector("main"); // please you const keyword instead of let
    let placeToInsertNumbers = document.querySelector(".numbers");

    buttonsParent.addEventListener(
      "click",
      this.clickHandler.bind(this, placeToInsertNumbers)
    );
    window.addEventListener(
      //are ever remove such listener?
      // for example when-even you changing a page
      "keypress",
      this.keyHandler.bind(this, placeToInsertNumbers)
    );
  }

  keyHandler(display, e) {
    let pattern = /[0-9]/; //дописать регвыражение для #*-()
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    var code = e.key;

    if (code == null) return;

    if (pattern.test(code)) {
      display.innerHTML += code;
    }
    return;
  }

  clickHandler(display, e) {
    let target = e.target;
    if (!target) return;

    if (target.classList.contains("key")) {
      display.innerHTML += target.textContent;
    }

    if (target.classList.contains("glyphicon-circle-arrow-left")) {
      let insertedNumbersArr = display.innerHTML.split("");
      if (insertedNumbersArr.length > 0) {
        let numberWithoutLast = insertedNumbersArr.slice(0, -1).join("");
        display.innerHTML = numberWithoutLast;
      }
    }
  }

  setHandlers() {
    this.buttonsHandler();
  }

  render() {
    return `<header class="header">
      <div class="container top-radius">
        <h2>${this.title}</h2>
      </div>
    </header>

    <main>
      <div class="container">
        <div class="number">
          <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
          <span class="numbers"></span>
          <span class="glyphicon glyphicon-circle-arrow-left" aria-hidden="true"></span>
        </div>
        <div class="keypad-holder">
          <button class="key">1</button>
          <button class="key">2</button>
          <button class="key">3</button>
          <button class="key">4</button>
          <button class="key">5</button>
          <button class="key">6</button>
          <button class="key">7</button>
          <button class="key">8</button>
          <button class="key">9</button>
          <button class="key">*</button> 
          <button class="key">0</button>
          <button class="key">#</button>                                   
          <button class="key"><span class="glyphicon glyphicon-earphone" aria-hidden="true"></span></button>
        </div>
      </div>
    </main>`;
  }
}

export {KeypadPage};