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
//2. Формат номера должен быть таким (099)-17-38-170  +

class KeypadPage {
  constructor(globalState) {
    this.state = globalState; //стал равен this.state-у со страницы App.js
    this.title = "Keypad";
  }

  buttonsHandler() {
    const buttonsParent = document.querySelector("main");
    const placeToInsertNumbers = document.querySelector(".numbers");

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
      this.formatNumber(display.innerHTML, display);
    }
    return;
  }

  clickHandler(display, e) {
    let target = e.target;
    if (!target) return;

    if (target.classList.contains("key")) {
      display.innerHTML += target.textContent;
      this.formatNumber(display.innerHTML, display);
    }

    if (target.classList.contains("glyphicon-circle-arrow-left")) {
      let insertedNumbersArr = display.innerHTML.split("");
      if (insertedNumbersArr.length > 0) {
        let numberWithoutLast = insertedNumbersArr.slice(0, -1).join("");
        display.innerHTML = numberWithoutLast;
      }
    }
  }

  formatNumber(str, display) {
    let willBeShown = '';
    if (str.length === 1 && str != '0') {
      alert ('A number should be started with zero');
    }; 
    if (str.length === 1 && str == '0') {
      willBeShown = str.replace(str, '(' + str);
    };
    if (str.length === 2 || str.length === 3) {
      willBeShown = str;
    };
    if (str.length === 4) {
      willBeShown = str.replace(str, str + ')-');
    };
    if (str.length === 5 || str.length === 6 || str.length === 7) {
      willBeShown = str;
    };
    if (str.length === 8) {
      willBeShown = str.replace(str, str + '-');
    };
    if (str.length === 9 || str.length === 10) {
      willBeShown = str;
    };
    if (str.length === 11) {
      willBeShown = str.replace(str, str + '-');
    };
    if (str.length === 12 || str.length === 13) {
      willBeShown = str;
    };
    if (str.length === 14) {
      willBeShown = str;
      this.finishState = str;
    };
    if (str.length > 14) {
      alert('It is enough');
      willBeShown = this.finishState;
    };

    display.innerHTML = willBeShown;
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