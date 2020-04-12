public class Main{
  public static void main(String[] args){
    Database db = new Database();
    Login log = new Login();
    log.newUser(db);
    log.newUser(db);
    log.existUser(db);
  }
}