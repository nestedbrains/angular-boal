import {Component, OnInit} from '@angular/core';
import {ApplicationService} from "../application.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: string = "dummy";
  email: string = "dummyemail@gmail.com";
  userLoginStatus: boolean = false;

  constructor(private _appService: ApplicationService) {
  }

  ngOnInit(): void {
    this._appService.loginStatus.asObservable().subscribe(
      (res) => {
        if (res) {
          this.userLoginStatus = true
          debugger
          // @ts-ignore
          this.username = JSON.parse(this._appService.getLocalStorage()).username
        } else {
          this.userLoginStatus = false
          this.username = "asasdasd"
        }
      }
    )
  }

}
