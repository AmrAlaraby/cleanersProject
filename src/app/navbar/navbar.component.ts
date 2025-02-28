import { Component, OnInit } from '@angular/core';
import { AuthService } from '../serveses/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private _AuthServece :AuthService,private _router:Router){}
  isLogin:boolean=false
  
  ngOnInit(): void {
    this._AuthServece.saveUserData()
    this._AuthServece.userData.subscribe(
      {
        next: ()=>{
          if (this._AuthServece.userData.getValue() != null) {
            this.isLogin=true
          } else {
            this.isLogin=false
          }
        }
      }
    )
  }
  logout(){
    debugger
    localStorage.removeItem('userToken')
    sessionStorage.removeItem('userToken')
    this._AuthServece.userData.next(null)
    this._router.navigate(['/home'])
  }
}
