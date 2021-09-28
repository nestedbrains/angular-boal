import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, from, Observable, Subject, zip} from "rxjs";
import {ApplicationService} from "./application.service";
import {filter, map, mergeAll, mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-boal';

  loginUser = false

  student$ = from([
    {id: 1, name: "Alex"},
    {id: 2, name: "Jonny"},
    {id: 3, name: "Marry"},
  ])
  address$ = from([
    {id: 1, location: "Chicago", sid: 1},
    {id: 2, location: "Florida", sid: 2},
    {id: 3, location: "New York", sid: 2},
    {id: 4, location: "California", sid: 1},
    {id: 5, location: "Texas", sid: 3},
  ])

  studentAddress = [
    {
      id: 1,
      name: "Alex",
      address: [
        {id: 1, location: "Chicago", sid: 1},
        {id: 4, location: "California", sid: 1}
      ]
    },
    {
      id: 2,
      name: "Jonny",
      address: [
        {id: 2, location: "Florida", sid: 2},
        {id: 3, location: "New York", sid: 2},
      ]
    },
    {
      id: 3,
      name: "Marry",
      address: [
        {id: 5, location: "Texas", sid: 3},
      ]
    },
  ]

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

    combineLatest(this.student$, this.address$).subscribe(studentAddress => {
      debugger
      console.log(studentAddress)
    })

  }

  getStudentAddress(student: any) {
    let data: any = [];
    return this.address$.pipe(
      filter(address => address.sid === student.id),
      map(res => {
        return res;
      })
    );
  }


}
