class Router {
	constructor(globalState) {
		this.state = globalState;
	}

	initializeRouter() {
		const mountNode = document.getElementById("mountNode");
		mountNode.innerHTML = `
        <div id="app"></div>
        <footer class="footer">
            <div class="container bottom-radius">
                <nav class="main-nav">
		            ${this.renderLink({
						href: "contacts",
						glyphicon: "search",
						text: "Contacts",
						active: true
					})}
		            ${this.renderLink({
						href: "keypad",
						glyphicon: "th",
						text: "Keypad",
						active: false
					})}
		            ${this.renderLink({
						href: "editcontact",
						glyphicon: "pencil",
						text: "Edit contact",
						active: false
					})}
		            ${this.renderLink({
						href: "user",
						glyphicon: "user",
						text: "User",
						active: false
					})}
		            ${this.renderLink({
						href: "adduser",
						glyphicon: "plus",
						text: "Add user",
						active: false
					})}    
                 </nav>
             </div>
         </footer>`;

		this.linksParent = document.querySelector(".main-nav");
	}

	definePage(callback) {
		this.linksParent.addEventListener("click", e => {
			e.preventDefault();

			this.tabState = {
				activeTab: document.querySelector(".active"),
			};

			let active = document.querySelector(".active");

			let target = e && e.target && e.target.closest("a[data-attr]");

			if (target.classList.contains("active")) {
				return;
			}

			if (target.classList.contains("tab")) {
				//let active = document.querySelector(".active"); //So, for example, you could the same solution as we did with a slider in class.

				this.tabState.activeTab.classList.remove("active");
				target.classList.add("active");
				this.tabState.activeTab = target;

				let href = target.getAttribute("href");

				this.switchRouter(href, callback);

			}
			return;
		});
	}

	switchRouter(href, callback) {
		this.state.activePage = href;
		callback(href);
	}

	renderLink(options) {
		let { href, glyphicon, text, active } = options;
		let activeClass = active ? "active" : "";

		return `<a href="${href}" class="tab ${activeClass}" data-attr="tab">
		          <span class="glyphicon glyphicon-${glyphicon}" aria-hidden="true"></span>
		          <span class = "tab-text">${text} </span>
		        </a> `;
	}
}

export {Router};