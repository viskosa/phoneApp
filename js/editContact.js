//edit-contact,
//- сделать данные редактируемыми (атрибут contentEditable) // input +
//- изменять backgroundColor										+
//import {Api} from './api.js';

class EditContact {
	constructor(globalState) {
		this.state = globalState;
		//this.api = new Api(this.state.url);

	}

	buttonsHandler() {
		let buttonsParent = document.querySelector("main");
		buttonsParent.addEventListener("click", this.clickHandler.bind(this));
	}

	clickHandler(e) {
		let target = e && e.target;
		if (!target) return;

		if (target.tagName === "INPUT") {
			target.classList.add("active-input");
		}

		target.addEventListener("blur", () => {
			target.classList.remove("active-input");
		});
	}

	renderInfo(options) {
		let { placeholder, value, name } = options;

		return `<div class="edit-field">
				<button href="#" class="add-btn">
					<span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
					<input type="text" placeholder="${placeholder}" value="${value}" name="${name}">
				</button>
			</div>`;
	}

	editUser() {
		if (!this.state.selectedUser) {
			return;
		}
		const { name, lastName, email, phone } = this.form.elements;

		let fullName = `${name.value} ${lastName.value}`;

		this.state.api.patchUser(
			[fullName, email.value, phone.value],
			this.state.selectedUser._id
		);
		this.state.selectedUser = null;
	}

	deleteUser() {
		if (!this.state.selectedUser) {
			return;
		}

		this.state.api.deleteUser(this.state.selectedUser._id);
		this.state.selectedUser = null;
		this.clearFields();
	}

	clearFields() {
		let myFormElements = this.form.elements;

		[...myFormElements].forEach(item => {
			if (item.tagName === "INPUT") {
				item.value = "";
			}
		});
	}

	setHandlers() {
		this.buttonsHandler();

		this.doneButton = document.querySelector(".done-btn");
		this.deleteButton = document.querySelector(".delete-contact");
		//this.cancelButton = document.getElementById("cancel");
		this.form = document.forms[0];
		this.form.addEventListener("submit", event => {
			event.preventDefault();
		});
		this.doneButton.addEventListener("click", this.editUser.bind(this));
		this.deleteButton.addEventListener("click", this.deleteUser.bind(this));
		//this.cancelButton.addEventListener("click", (e) => { //не срабатывают табы
		//	e.preventDefault();
		//	window.history.back();
		//});
	}

	render() {
		let firstName = this.state.selectedUser
			? this.state.selectedUser.fullName.split(" ")[0]
			: "";
		let lastName = this.state.selectedUser
			? this.state.selectedUser.fullName.split(" ")[1]
			: "";
		let email = this.state.selectedUser
			? this.state.selectedUser.email
			: "";
		let mobilePhone = this.state.selectedUser
			? this.state.selectedUser.phone
			: "";

		return `<header class="header">
			<div class="container top-radius">
				<nav class="user-top-line">
					<a href="" id="cancel">Cancel</a>
					<button type="submit" form="edit-contact" formaction="#" formmethod="get" class="done-btn">Done</button>
				</nav>
			</div>
		</header>

		<main class="main">
			<form action="#" method="POST">
				<div class="container">
					<div class="edit-main-info">
						<div class="edit-foto"><img src="images/user-face-mini.png" alt="#" class=" user-img img-circle center-block"></div>
						<div class="main-info-holder">
							${this.renderInfo({
								placeholder:
									this.state.selectedUser &&
									this.state.selectedUser.fullName
										? ""
										: "First Name",
								value: `${firstName}`,
								name: "name"
							})}
							${this.renderInfo({
								placeholder:
									this.state.selectedUser &&
									this.state.selectedUser.fullName
										? ""
										: "Last Name",
								value: `${lastName}`,
								name: "lastName"
							})}
							${this.renderInfo({
								placeholder:
									this.state.selectedUser &&
									this.state.selectedUser.company
										? ""
										: "Company",
								value: ``,
								name: "company"
							})}
						</div>
					</div>
					<div class="scroll-holder">
						<div class="edit-info">
							<div class="edit-field">
								<button href="#" class="delete-btn"><span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span>
									<span>phone</span>
									<input type="tel" value="${mobilePhone}" name="phone">
								</button>
							</div>
							${this.renderInfo({
								placeholder:
									this.state.selectedUser &&
									this.state.selectedUser.homePhone
										? ""
										: "add home phone",
								value: ``,
								name: "homePhone"
							})}
							${this.renderInfo({
								placeholder:
									this.state.selectedUser &&
									this.state.selectedUser.email
										? ""
										: "add email",
								value: `${email}`,
								name: "email"
							})}
							${this.renderInfo({
								placeholder:
									this.state.selectedUser &&
									this.state.selectedUser.address
										? ""
										: "add address",
								value: ``,
								name: "address"
							})}
							${this.renderInfo({
								placeholder:
									this.state.selectedUser &&
									this.state.selectedUser.birthday
										? ""
										: "add birthday",
								value: ``,
								name: "birthday"
							})}
							${this.renderInfo({
								placeholder:
									this.state.selectedUser &&
									this.state.selectedUser.profile
										? ""
										: "add social profile",
								value: ``,
								name: "profile"
							})}
							${this.renderInfo({ placeholder: "add field", value: ``, name: "add" })}
							<div class="edit-field">
								<button href="#" class="delete-contact">delete contact</button>
							</div>
						</div>
					</div>
				</div>
			</form>	
		</main>`;
	}
}

export {EditContact};