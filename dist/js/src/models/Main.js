// public class Main{
class Main{
	// public static void main(String[] args){
	/**
	 * ...
	 * @param {String} args 
	 */
	static main(args){
		const db = new Database();
		const log = new Login();
		log.newUser(db);
		log.newUser(db);
		log.existUser(db);
	}
}