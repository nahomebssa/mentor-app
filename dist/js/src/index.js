// const App = require("./App")

const $root = document.getElementById("root")

// const basenameDeploy = "/mentor-app/app.html"
// const basenameLocal = basenameDeploy || "/dist/app.html"


if (quickReloadEnabled()) {
	const { protocol, host, pathname } = window.location
	document.body.prepend(
		makeElement(
			`<a id="btn-refresh" href="${protocol}//${host}${pathname}">
				<i class="material-icons">refresh</i>
			</a>`
		)
	)
}

ReactDOM.render(<App basename={window.location.pathname} />, $root)