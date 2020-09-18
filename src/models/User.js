class MentorshipType {
    static MENTEE = "MENTEE"
    static MENTOR = "MENTOR"
    static MENTOR_AND_MENTEE = "MENTOR_AND_MENTEE"
}

class User {
	
	/**
     * 
     * @param {*} username
     * @param {*} password
     */
	constructor({ username, password, isMentee=true, isMentor=false, fields=[] }) {
		this.username = username;
		this.password = pWord;
        this.mentorship = MentorshipType.MENTEE
        if (isMentee)
            this.mentorshipTitles.push(MentorshipType.MENTEE)
        if (isMentor)
            this.mentorshipTitles.push(MentorshipType.MENTOR)
		this.fields = [];
	}
	
	getUsername() {
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