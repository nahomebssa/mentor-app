/*
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
*/

const ENUM = obj => Object.freeze(obj)


const __DEBUG__ = false;
let ALERT, DBG, ERR, ASSERT;
if (__DEBUG__)
{
	ALERT = alert
	DBG = console.log
	ERR = console.error
	ASSERT = console.assert
}
else
{
	ALERT = () => {}
	DBG = () => {}
	ERR = () => {}
	ASSERT = () => {}
}


export {
	DBG,
	ALERT,
	ERR,
	ENUM,
	ASSERT,
}