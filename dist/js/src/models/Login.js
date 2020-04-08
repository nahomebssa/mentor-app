class Scanner {
	constructor(arg1) { }
	next(msg) { prompt(msg) }
}
const System = { in: null, out: { print: alert, println: alert } }
// import java.util.Scanner;
// public class Login{
class Login{
	//Database db = new Database();
	//   Scanner input;
	//   String uName;
	//   String pWord;
	//   public Login(){
	//     input = null;
	//     uName = "";
	//     pWord = "";
	//   }
	constructor(){
		this.input = null;
		this.uName = "";
		this.pWord = "";
	}
	
	//   public User newUser(Database db){
	//     boolean loop = true;
	//     User user = null;
	//     while(loop){
	//       System.out.print("Enter New Username: ");
	//       input = new Scanner(System.in);
	//       uName = input.next();
	//       if(db.hasUser(uName)){
	//         System.out.println("Invalid Username");
	//         continue;
	//       }
	//       System.out.print("Enter New Password: ");
	//       input = new Scanner(System.in);
	//       pWord = input.next();
	//       user = new User(uName,pWord);
	//       db.addUser(user);
	//       System.out.println("New User Created");
	//       loop = false;
	//     }
	//     System.out.println(db.toString());
	//     return user;
	//   }
	/**
	* 
	*/
	newUser(db){
		let loop = true;
		let user = null;
		while(loop){
			System.out.print("Enter New Username: ");
			this.input = new Scanner(System.in);
			this.uName = this.input.next();
			if(db.hasUser(this.uName)){
				System.out.println("Invalid Username");
				continue;
			}
			System.out.print("Enter New Password: ");
			this.input = new Scanner(System.in);
			this.pWord = this.input.next();
			user = new User(this.uName,this.pWord);
			db.addUser(user);
			System.out.println("New User Created");
			loop = false;
		}
		System.out.println(db.toString());
		return user;
	}
	
	// public User existUser(Database db){
	// 	boolean loop = true;
	// 	User user = null;
	// 	while(loop){
	// 		System.out.print("Enter Username: ");
	// 		input = new Scanner(System.in);
	// 		uName = input.next();
	// 		if(!db.hasUser(uName)){
	// 			System.out.println("Invalid Username");
	// 			continue;
	// 		}
	// 		user = db.getUser(uName);
	// 		System.out.print("Enter Password: ");
	// 		input = new Scanner(System.in);
	// 		pWord = input.next();
	// 		if(!pWord.equals(user.getPword())){
	// 			System.out.println("Invalid Password");
	// 			continue;
	// 		}
	// 		System.out.println("User Found");
	// 		loop = false;
	// 	}
	// 	return user;
	// }
	/**
	 * 
	 */
	existUser(db){
		let loop = true;
		let user = null;
		while(loop){
			System.out.print("Enter Username: ");
			this.input = new Scanner(System.in);
			this.uName = this.input.next();
			if(!db.hasUser(this.uName)){
				System.out.println("Invalid Username");
				continue;
			}
			user = db.getUser(this.uName);
			System.out.print("Enter Password: ");
			this.input = new Scanner(System.in);
			this.pWord = this.input.next();
			if(!this.pWord.equals(user.getPword())){
				System.out.println("Invalid Password");
				continue;
			}
			System.out.println("User Found");
			loop = false;
		}
		return user;
	}
	
	
}