import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/User';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private auth: AngularFireAuth) { }

  recoverEmailPassword(email:string): Observable<void> {
    return new Observable<void>(observer=>{
     /* setTimeout(()=>{
        if(email == "error@email.com"){
          observer.error({message: "Email not found"})
        }
        observer.next();
        observer.complete();

      }, 3000) */

      this.auth.sendPasswordResetEmail(email).then(()=>{
        observer.next();
        observer.complete();
      }).catch(error =>{
        observer.error(error);
        observer.complete();
      });
    })

  }

  login(email: string, password: string): Observable<User>{
    return new Observable<User>(observer => {
     /* setTimeout(()=>{
        if(email == "error@email.com"){
          observer.error({message: "User not found"});
          observer.next();
        }else{
          const user = new User();
          user.email = email;
          user.id="userId";
          observer.next(user);

        }
        observer.complete();

      }, 3000) */

      this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(()=>{
        this.auth.signInWithEmailAndPassword(email, password)
        .then((firebaseUser: firebase.auth.UserCredential) => {
          const uid = firebaseUser.user?.uid || ''; // Handle undefined case by providing a default value
          observer.next({ email, id: uid });
          observer.complete();
        }).catch(error=>{
          observer.error(error);
          observer.complete();
        })
      })

    })
  }

}
