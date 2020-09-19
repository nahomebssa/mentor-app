import firebase from "firebase";
import { FirebaseManager } from "./FirebaseManager";
import { ALERT, ERR, ENUM, DBG } from "../utils";

class AuthenticationManager {
    static AuthState = ENUM({
        SIGNEDIN: "AuthState.SIGNEDIN",
        SIGNEDOUT: "AuthState.SIGNEDOUT",
        GUESTMODE: "AuthState.GUESTMODE",
    });
    static AuthProvider = ENUM({
        EMAIL: "AuthProvider.EMAIL",
        GOOGLE: "AuthProvider.GOOGLE",
    });
    static AuthResult = class {
        // constructor({ status, message }) {
        constructor({ result, error }) {
            this.result = result;
            this.error = error;
        }
    };

    static _authState = AuthenticationManager.AuthState.SIGNEDOUT;

    static _checkEmailAndPassword(email, password) {
        if (email && password) {
            if (email.includes("@") && email.includes(".")) return true;
        }
        return false;
    }

    static setAuthState(state) {
        AuthenticationManager._authState =
            AuthenticationManager.AuthState.SIGNEDIN;
    }

    static signIn({
        provider = "",
        email = "",
        password = "",
        onSuccess = () => {},
        onFail = () => {},
    }) {
        const run = true;
        if (run) {
            DBG("HERE", onSuccess);
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(onSuccess)
                .catch(onFail);
        } else {
            let authRes;
            switch (provider) {
                case AuthenticationManager.AuthProvider.EMAIL:
                    // if (!AuthenticationManager._checkEmailAndPassword(email, password))
                    // {
                    // 	throw new Error("[AuthenticationManager#signIn] Invalid email or password, from _checkEmailAndPassword")
                    // }
                    // const signInAuthResult = FirebaseManager.signInWithEmailAndPassword(email, password)
                    const {
                        result,
                        error,
                    } = FirebaseManager.signInWithEmailAndPassword(
                        email,
                        password
                    );
                    authRes = new AuthenticationManager.AuthResult({
                        result,
                        error,
                    });
                    break;
                case AuthenticationManager.AuthProvider.GOOGLE:
                    FirebaseManager.signInWithGoogle();
                    break;
                default:
                    authRes = new AuthenticationManager.AuthResult({
                        result: null,
                        error: null,
                    });
                    ALERT(
                        "[AuthenticationManager#signIn] Error: No provider was specified."
                    );
                    ERR(
                        "[AuthenticationManager#signIn] Error: No provider was specified."
                    );
                    ALERT(
                        `[AuthenticationManager#signIn] Provider: ${provider.constructor.name} ${provider}`
                    );
                    ERR(
                        `[AuthenticationManager#signIn] Provider: ${provider.constructor.name} ${provider}`
                    );
                    break;
            }
            return authRes;
        }
    }
}

export { AuthenticationManager };
