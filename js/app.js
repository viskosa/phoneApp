/*ДЗ
Cделать phone-book
у которого будет:
1) Вы заполните пользователей на сервер по адресу с вашими инициалами. +
2) При загрузке приложения, вы получите пользователей с сервера			+
3) В приложении будет js - роутер, (при смене страницы перезагрузки не будет)	+
4) При нажатии на пользователя будет открываться данный пользователь	+
5) Будет возможность добавить пользователя на сервере заполнив данные в форме (add-contact)	+
----------------   ~90 балов
Для тех кто хочет +500$ к зарплате на старте
6) Добавить удаление пользователей (2) +
7) Должна быть модульная структура и Проект должен собираться при помощи webpack(2) (!)
8) Проект должен транспайлится через babel последние 2 версии браузеров (2) (!)
9) и после публикации на gh-pages, должен быть минифицирован(2)
10) добавьте еще одну первую страницу на которой будет "auth"   +
в этот инпут можно ввести инициалы easycode студента (2)
в зависимости от этого будут загружаться разные пользователи
*/
import { ContactsPage } from "./contacts.js";
import { AddUser } from "./addUser.js";
import { KeypadPage } from "./keypad.js";
import { EditContact } from "./editContact.js";
import { User } from "./user.js";
import { Router } from "./router.js";
import { Api } from "./api.js";

class App {
	constructor() {
		//this.url = `https://easycode-js.herokuapp.com/pnv2/users`;
		this.state = {
			activePage: "contacts"
			//api: new Api(this.url)
		};

		this.pages = {
			contacts: new ContactsPage(this.state), // тут передали ссылку на this.state
			adduser: new AddUser(this.state),
			keypad: new KeypadPage(this.state),
			editcontact: new EditContact(this.state),
			user: new User(this.state),
			router: new Router(this.state)
		};

		this.pages.router.initializeRouter();
		this.pages.router.definePage(this.render.bind(this));
		this.appDOMNode = document.getElementById("app"); // сюда будем делать рендер всех страниц
		// и это не будет затрагивать футер и его события

		window.addEventListener("popstate", event => {
			this.updateView(event.state);
		});
	}

	preRender() {
		let db = prompt("Enter your database, please", "");

		if (db == null) {
			db = "pnv2";
		}

		this.url = `https://easycode-js.herokuapp.com/${db}/users`;
		this.state.api = new Api(this.url);

		this.render();
	}

	render() {
		const { activePage } = this.state;

		if (activePage == "contacts") {
			let response = this.state.api.requestUsers(); //сюда вернулся промис
			response
				.then(data => {
					this.state.people = data;
					this.completeRender(activePage);
					this.state.formattedPeople = this.formatArrayWithPeople(
						this.state.people
					);
					console.log(this.state.formattedPeople);
				})
				.catch(error => console.log("error", error));
		} else {
			this.completeRender(activePage);
		}
	}

	completeRender(activePage) {
		const forHistory = this.pages[activePage].render();
		this.appDOMNode.innerHTML = forHistory; // и отрендерь ту страничку,
		// которая сейчас указана как activePage в this.state
		this.pages[activePage].setHandlers(); //и навесь обработчики событий
		window.history.pushState(forHistory, activePage, activePage); // добавляем в историю ссылку, которая будет наверху
	}

	updateView(content) {
		this.appDOMNode.innerHTML = content;
	}

	formatArrayWithPeople(arr) {
		let formattedPeople = arr.map(item => {
			let name = item.fullName.split(" ")[0];
			let lastName = item.fullName.split(" ")[1];

			let copy = obj => {
				let newObj = Object.assign({}, obj, {
					...obj,
					name: name,
					lastName: lastName
				});
				return newObj;
			};
			return copy(item);
		});
		return formattedPeople;
	}

	static initialize() {
		return new App().preRender();
	}
}

App.initialize();
