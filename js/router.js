class Router {
	//constructor(activePage) {
	//	this.activePage = activePage;
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

	definePage(callback) {	//function switchRounter, should only change the router and don't make any checks and probably has a minimal of conditionals
		this.linksParent.addEventListener("click", e => {
			e.preventDefault();
			//let target = e && e.target;
			let target =
				e &&
				e.target &&
				(e.target.closest("a") || e.target.classList.contains("tab")); //You can add additional attributes
			//to every link and indicate "user clicked on link" that way. on real word usage probably we should be always 100% be sure about our target
			//I'm pretty sure you don't need such event delegation because of your event working on a small area of responsibilities.
			if (target == false) { 
				return;
			}

			if (target.classList.contains("active")) {
				return;
			}

			if (target.classList.contains("tab")) {
				let active = document.querySelector(".active"); //So, for example, you could the same solution as we did with a slider in class.

				active.classList.remove("active");
				target.classList.add("active");

				let href = target.getAttribute("href");

				this.switchRouter(href, callback);
				//console.log('active page:', this.activePage)
			}
			return;
		});
	}

	switchRouter(href, callback) {
		this.state.activePage = href;
		callback(href);

		//window.history.pushState()
	}

	renderLink(options) {
		let { href, glyphicon, text, active } = options;
		let activeClass = active ? "active" : "";

		return `<a href="${href}" class="tab ${activeClass}">
		          <span class="glyphicon glyphicon-${glyphicon}" aria-hidden="true"></span>
		          <span class = "tab-text">${text}</span>
		        </a> `;
	}

}