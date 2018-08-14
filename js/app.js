class App {
	constructor() {
		this.state = {
			//равен ссылке, которая ведет на объект
/*			people: [
				{
					name: "Кира",
					lastName: "Воробьева",
					email: "Kira1990@ec.ua"
				},
				{
					name: "Виктор",
					lastName: "Кривенко",
					email: "ViktorKriv@ec.ua"
				}
			],*/
			activePage: "contacts",
		};
		this.url = `https://easycode-js.herokuapp.com/pnv2/users`;
		this.pages = {
			contacts: new ContactsPage(this.state), // тут передали ссылку на this.state
			adduser: new AddUser(this.state),
			keypad: new KeypadPage(this.state),
			editcontact: new EditContact(this.state),
			user: new User(this.state),
			router: new Router(this.state),
			api: new Api(this.url)
		};

		this.pages.router.initializeRouter();
		this.pages.router.definePage(this.render.bind(this));
		this.appDOMNode = document.getElementById("app"); // сюда будем делать рендер всех страниц
		// и это не будет затрагивать футер и его события

/*		window.addEventListener('popstate'. event => { // не работает
			render(event.state);
		})*/
	}

	render(href) {
		const { activePage } = this.state;

		if (activePage == 'contacts') {
			let response = this.pages.api.requestUsers();//сюда вернулся промис
			response
				.then(data => {
					this.state.people = data;
					this.completeRender(activePage);
				})
				.catch(error => console.log('error', error));

		} else {

			this.completeRender(activePage);
		}
	}

	completeRender(activePage) {
		const forHistory = this.pages[activePage].render(); 	
		this.appDOMNode.innerHTML = forHistory;				// и отрендерь ту страничку,
															// которая сейчас указана как activePage в this.state												
		this.pages[activePage].setHandlers(); 				//и навесь обработчики событий

		//window.history.pushState(forHistory, href, href) // ДОПИСАТЬ!!!

	}

	static initialize() {
		return new App().render();
	}
}

App.initialize();