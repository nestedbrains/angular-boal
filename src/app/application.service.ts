import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

 public loginStatus = new BehaviorSubject<boolean>(false)


  constructor() {
    debugger
    if (this.getLocalStorage() !== null) {
      this.loginStatus.next(true)
    } else {
      this.loginStatus.next(false)

    }
  }

  getObservableStatus() {
    return this.loginStatus;
  }

  getObservableStatus1() {
   this.loginStatus.next(false);
  }



  setLocalStorage() {
    const payload = {
      username: "dummy"
    }
    localStorage.setItem("user", JSON.stringify(payload));
  }

  getLocalStorage() {
    return localStorage.getItem("user");
  }

  changeUsername() {
    const payload = {
      username: "ovee"
    }
    localStorage.setItem("user", JSON.stringify(payload));
  }


  clearLocalStorage() {
    localStorage.removeItem("user");
  }

}
