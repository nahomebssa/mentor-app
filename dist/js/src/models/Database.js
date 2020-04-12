//import java.util.ArrayList;
// public class Database{
class Database{
	
	// private ArrayList<User> users;
	
	// public Database(){
	//   users = new ArrayList<User>();
	// }
	
	constructor(){
		this.users = [];
	}
	
	// public boolean addUser(User user){
	// 	users.add(user);
	// 	return true;
	// }

	/**
	 * @param{User} user
	 * @returns{boolean} ...
	 */
	addUser(user){
		this.users.push(user);
		return true;
	}

	
	// public boolean hasUser(User user){
	// 	for(int i = 0; i < users.size(); i++){
	// 		if(user.getUname() == users.get(i).getUname()){
	// 			return true;
	// 		}
	// 	}
	// 	return false;
	// }

	/**
	 * @param{User} user
	 * @returns{boolean} ...
	 */
	hasUser(user){
		for(let i = 0; i < this.users.length; i++){
			if(user.getUname() == this.users[i].getUname()){
				return true;
			}
		}
		return false;
	}
	
	// public boolean hasUser(String uName){
	// 	for(int i = 0; i < users.size(); i++){
	// 		if(uName.equals(users.get(i).getUname())){
	// 			return true;
	// 		}
	// 	}
	// 	return false;
	// }
	/**
	 * @param{String} uName
	 * @returns{boolean} ...
	 */
	hasUserByUname(uName){
		for(let i = 0; i < this.users.length; i++){
			if(uName === this.users[i].getUname()){
				return true;
			}
		}
		return false;
	}
	
	// public User getUser(String uName){
	// 	for(int i = 0; i < users.size(); i++){
	// 		if(uName.equals(users.get(i).getUname())){
	// 			return users.get(i);
	// 		}
	// 	}
	// 	return null;
	// }
	/**
	 * @param {String} uName
	 */
	getUserByUname(uName){
		for(let i = 0; i < this.users.length; i++){
			if(uName === this.users[i].getUname()){
				return users[i];
			}
		}
		return null;
	}
	
	// public String toString(){
	// 	String str = "";
	// 	for(int i = 0; i < users.size(); i++){
	// 		str += users.get(i).toString() + "\n";
	// 	}
	// 	return str;
	// }
	toString(){
		let str = "";
		for(let i = 0; i < this.users.length; i++){
			str += this.users[i].toString() + "\n";
		}
		return str;
	}
}