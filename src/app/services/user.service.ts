import { Injectable, inject } from '@angular/core'
import { Auth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private uid: string|undefined;

  constructor(private auth: Auth ) {
    this.uid = auth.currentUser?.uid;
  }



  //Whatever this method receives as email and password will be transferred to firebase
  register({ email, password} : any) {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    localStorage.clear();
    return signOut(this.auth);
  }

  getState(){
    this.uid = this.auth.currentUser?.uid;
    if (this.uid) {return true}
    return false;
  }

}
