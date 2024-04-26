import { firebaseService } from "./Firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

export class AuthService {
  constructor() {
    this._auth = getAuth(firebaseService.app); // инициализируется объект аутентификации (_auth) с помощью функции.
    //Это позволяет приложению взаимодействовать с сервисами аутентификации Firebase.
  }

  authorizeUser() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this._auth, resolve, reject);
    }); // функция для авторизации пользователя
  }

  getCurrentUser() {
    return this._auth.currentUser;
  }

  updateUserProfile(data) {
    return updateProfile(this._auth.currentUser, data);
  }

  signIn(email, password) {
    return signInWithEmailAndPassword(this._auth, email, password);
  }

  signUp(email, password) {
    return createUserWithEmailAndPassword(this._auth, email, password);
  }

  logOut() {
    return signOut(this._auth);
  }
}

export const authService = new AuthService();
