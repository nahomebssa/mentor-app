function $(selector) {
	return document.querySelector(selector)
}
function $$(selector) {
	return document.querySelectorAll(selector)
}
function makeElement(html) {
	const wrapper = document.createElement("div")
	wrapper.innerHTML = html
	return wrapper.firstChild
}
function _typeCheck(instance, type, msg) {
	if (!(instance instanceof type)) {
		throw new Error(msg || "Type check error")
	}
}

function assert(expression = true, failMsg = "") {
	class AssertionError extends Error { constructor(msg) { super(msg) } }
	if (!expression)
		throw new AssertionError(`${failMsg}`)
}

const ENUM = obj => Object.freeze(obj)

const FNID = (num=0) => {
	const lvl = num + 1
	const err = new Error()
	const arr = err.stack.split("\n")[lvl+1].split(/\s|\:|\/|\)/)
	const _id = arr[5] == "new" ? `${arr[6]}.constructor` : arr[5]
	return `[${_id}]`
}

const LoggerLevel = ENUM({ INFO: 0, LOG: 1, DEBUG: 1, WARN: 2, ERROR: 3 })
const _log = function(tag, lvl = 0, ...args) {
	const MAXLEN = 20
	let spacing = tag.length > MAXLEN ? "\n" : " "
	let _logger = null;
	switch (lvl) {
		case 0:
			_logger = console.info
			break;
		case 1:
			_logger = console.log
			break;
		case 2:
			_logger = console.warn
			break;
		case 3:
			_logger = console.error
			spacing += tag.length > MAXLEN ? "  " : ""
			break;
		default:
			_logger = console.log
			break;
	}
	_logger(`${FNID(2)}${spacing}${tag}`, ...args)
}
const __DEBUG__ = true;
// const __DEBUG__ = false;
const SETDEBUG = (b) => { __DEBUG__ = b ? true : false }
let ALERT = () => {},
	INFO  = () => {},
	LOG   = () => {},
	DBG   = () => {},
	ERR   = () => {},
	WARN  = () => {};
if (__DEBUG__)
{
	ALERT = (msg, ...args) => alert(`${FNID(1)}\n${msg}`, ...args)
	INFO  = (msg) => _log(msg, LoggerLevel.INFO)
	LOG   = (msg) => _log(msg, LoggerLevel.LOG)
	DBG   = (msg) => _log(msg, LoggerLevel.DEBUG)
	WARN  = (msg) => _log(msg, LoggerLevel.WARN)
	ERR   = (msg) => _log(msg, LoggerLevel.ERROR)
}

const quickReloadEnabled = (shouldBe) => {
	return (shouldBe == undefined) ? (window.location.hostname === "localhost") : shouldBe
}