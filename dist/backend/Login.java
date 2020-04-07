import java.util.Scanner;
public class Login{
  //Database db = new Database();
  Scanner input;
  String uName;
  String pWord;
  public Login(){
    input = null;
    uName = "";
    pWord = "";
  }
  
  public User newUser(Database db){
    boolean loop = true;
    User user = null;
    while(loop){
      System.out.print("Enter New Username: ");
      input = new Scanner(System.in);
      uName = input.next();
      if(db.hasUser(uName)){
        System.out.println("Invalid Username");
        continue;
      }
      System.out.print("Enter New Password: ");
      input = new Scanner(System.in);
      pWord = input.next();
      user = new User(uName,pWord);
      db.addUser(user);
      System.out.println("New User Created");
      loop = false;
    }
    System.out.println(db.toString());
    return user;
  }
  
  public User existUser(Database db){
    boolean loop = true;
    User user = null;
    while(loop){
      System.out.print("Enter Username: ");
      input = new Scanner(System.in);
      uName = input.next();
      if(!db.hasUser(uName)){
        System.out.println("Invalid Username");
        continue;
      }
      user = db.getUser(uName);
      System.out.print("Enter Password: ");
      input = new Scanner(System.in);
      pWord = input.next();
      if(!pWord.equals(user.getPword())){
        System.out.println("Invalid Password");
        continue;
      }
      System.out.println("User Found");
      loop = false;
    }
    return user;
  }
  
  
}