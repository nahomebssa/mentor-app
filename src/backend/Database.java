import java.util.ArrayList;
public class Database{
  private ArrayList<User> users;
  
  public Database(){
    users = new ArrayList<User>();
  }
  
  public boolean addUser(User user){
    users.add(user);
    return true;
  }
  
  public boolean hasUser(User user){
    for(int i = 0; i < users.size(); i++){
      if(user.getUname() == users.get(i).getUname()){
        return true;
      }
    }
    return false;
  }
  
  public boolean hasUser(String uName){
    for(int i = 0; i < users.size(); i++){
      if(uName.equals(users.get(i).getUname())){
        return true;
      }
    }
    return false;
  }
  
  public User getUser(String uName){
    for(int i = 0; i < users.size(); i++){
      if(uName.equals(users.get(i).getUname())){
        return users.get(i);
      }
    }
    return null;
  }
  
  public String toString(){
    String str = "";
    for(int i = 0; i < users.size(); i++){
      str += users.get(i).toString() + "\n";
    }
    return str;
  }
}