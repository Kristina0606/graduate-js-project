import { initializeApp } from "firebase/app";

export class Firebase {
  constructor() {
    this._app = initializeApp({
      apiKey: import.meta.env.VITE_API_KEY,
      authDomain: "movie-mingle-fc525.firebaseapp.com",
      projectId: "movie-mingle-fc525",
      storageBucket: "movie-mingle-fc525.appspot.com",
      messagingSenderId: "316903741963",
      appId: "1:316903741963:web:434c16b8ae29211d13050e",
    });
  }

  get app() {
    return this._app;
  }
}

export const firebaseService = new Firebase();
