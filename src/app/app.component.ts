import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {ApplicationService} from "./application.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-boal';

  loginUser = false

  constructor(private _appService: ApplicationService) {
  }


  ngOnInit(): void {
    this._appService.loginStatus.asObservable().subscribe(
      (res) => {
        this.loginUser = res;
      }
    )
  }

  changeName() {
    this._appService.changeUsername()
    this._appService.loginStatus.next(true)


  }

  login() {
    this._appService.setLocalStorage()


      this._appService.loginStatus.next(true)
      this.loginUser = true


  }

  logout() {
    this._appService.clearLocalStorage()


      this.loginUser = false
      this._appService.loginStatus.next(false)



  }


}
