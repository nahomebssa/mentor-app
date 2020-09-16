export function $(selector) {
	return document.querySelector(selector)
}
export function $$(selector) {
	return document.querySelectorAll(selector)
}
export function range(n) {
    return [...Array(n).keys()]
}
export function assert(expression = true, failMsg = "") {
	class AssertionError extends Error { constructor(msg) { super(msg) } }
	if (!expression)
		throw new AssertionError(`${failMsg}`)
}
export const fakedb = {
    users: []
}

const FIELDS = [
    "IT & Computer Science",
    "Biology",
    "Physics",
    "Accounting",
    "Health & Medicine",
    "Educator"
]


for (let i = 1; i < 20; i++) {
    fakedb.users.push({
        username: `@user${i}`,
        name: `User ${i}`,
        email: `user${i}`,
        bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi corporis quam, unde voluptate labore repellendus nisi facilis veniam. Laboriosam nulla fuga officia quidem sint qui odio amet pariatur quod corporis.",
        areaOfExpertise: (() => {
            let maxLen = Math.floor(Math.random() * 3)
            const index = () => Math.floor(Math.random() * FIELDS.length)
            const arr = []
            while (maxLen-- > 0) {
                arr.push(FIELDS[index()])
            }
            return arr;
        })(),
        rating: Math.floor(Math.random() * 5),
    })
}


const ENUM = obj => Object.freeze(obj)

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

export { ALERT, DBG, ERR, ENUM }