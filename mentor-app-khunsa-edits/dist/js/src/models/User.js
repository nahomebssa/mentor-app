// public class User{
class User {
	
	// private String uName;
	// private String pWord;
	// private boolean mentor;
	// private boolean mentee;
	// private String[] fields;
	
	// public User(String uName, String pWord){
	//   this.uName = uName;
	//   this.pWord = pWord;
	//   mentor = false;
	//   mentee = false;
	//   fields = new String[5];
	// }
	
	/**
	* ...
	* @param {String} uName 
	* @param {String} pWord 
	*/
	constructor(uName, pWord) {
		this.uName = uName;
		this.pWord = pWord;
		this.mentor = false;
		this.mentee = false;
		this.fields = [];
	}
	
	// public String getUname(){
	//   return uName;
	// }
	getUname() {
		return this.uName;
	}

	// public String getPword(){
	// 	return pWord;
	// }
	getPword() {
		return this.pWord;
	}
	
	// public void changeMentor(){
	//   this.mentor = !mentor;
	// }
	changeMentor() {
		this.mentor = !mentor;
	}
	
	// public void changeMentee(){
	//   this.mentee = !mentee;
	// }
	changeMentee() {
		this.mentee = !mentee;
	}
	
	// public String toString(){
	//   String str = "Username: " + uName + "\nPassword: " + pWord + "\n";
	//   if(mentor){str += "Mentor\n";}
	//   if(mentee){str += "Mentee\n";}
	
	//   return str;
	// }
	toString(){
		let str = "Username: " + this.uName + "\nPassword: " + this.pWord + "\n";
		if(this.mentor){str += "Mentor\n";}
		if(this.mentee){str += "Mentee\n";}
		return str;
	}
}