public class User{
  private String uName;
  private String pWord;
  private boolean mentor;
  private boolean mentee;
  private String[] fields;
  
  public User(String uName, String pWord){
    this.uName = uName;
    this.pWord = pWord;
    mentor = false;
    mentee = false;
    fields = new String[5];
  }
  
  public String getUname(){
    return uName;
  }
  
  public String getPword(){
    return pWord;
  }
  
  public void changeMentor(){
    this.mentor = !mentor;
  }
  
  public void changeMentee(){
    this.mentee = !mentee;
  }
  
  public String toString(){
    String str = "Username: " + uName + "\nPassword: " + pWord + "\n";
    if(mentor){str += "Mentor\n";}
    if(mentee){str += "Mentee\n";}
    
    return str;
  }
}