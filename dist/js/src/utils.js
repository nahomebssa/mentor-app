function $(selector) {
	return document.querySelector(selector)
}
function $$(selector) {
	return document.querySelectorAll(selector)
}

function assert(expression = true, failMsg = "") {
	class AssertionError extends Error { constructor(msg) { super(msg) } }
	if (!expression)
		throw new AssertionError(`${failMsg}`)
}

const ENUM = obj => Object.freeze(obj)