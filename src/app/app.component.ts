import {Component, OnInit} from '@angular/core';
import {combineLatest, of} from "rxjs";
import {ApplicationService} from "./application.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-boal';

  loginUser = false

  student$ = of([
    {id: 1, name: "Alex"},
    {id: 2, name: "Jonny"},
    {id: 3, name: "Marry"},
  ])
  address$ = of([
    {id: 1, location: "Chicago", sid: 1},
    {id: 2, location: "Florida", sid: 2},
    {id: 3, location: "New York", sid: 2},
    {id: 4, location: "California", sid: 1},
    {id: 5, location: "Texas", sid: 3},
  ])

  studentAddress:any = []

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


  calculation() {

 combineLatest(
      [this.student$, this.address$],
      (students, address) =>
        students.map((s) => ({
          ...s,
          address: address.filter((a) => a.sid === s.id),
        })) // combineLatest also takes an optional projection function
    ).subscribe(
      res => {

        this.studentAddress =  res
      }
    );

  }

}
