export function $(selector) {
	return document.querySelector(selector)
}
export function $$(selector) {
	return document.querySelectorAll(selector)
}

export function assert(expression = true, failMsg = "") {
	class AssertionError extends Error { constructor(msg) { super(msg) } }
	if (!expression)
		throw new AssertionError(`${failMsg}`)
}

export const ENUM = obj => Object.freeze(obj)


const __DEBUG__ = false;
let ALERT, DBG, ERR;
if (__DEBUG__)
{
	ALERT = alert
	DBG = console.log
	ERR = console.error
}
else
{
	ALERT = () => {}
	DBG = () => {}
	ERR = () => {}
}

export { ALERT, DBG, ERR }