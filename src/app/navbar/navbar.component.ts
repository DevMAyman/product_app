import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AddToCartService } from '../add-to-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  token: any;
  isLogin: boolean = false;
  cartData: any;
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _AddToCartService: AddToCartService,
    private _Router: Router
  ) {
    _AuthenticationService.userData.subscribe({
      next: () => {
        if (_AuthenticationService.userData.getValue() !== null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      },
    });
  }
  ngOnInit(): void {
    this._AddToCartService.userData.subscribe({
      next: () => {
        if (localStorage.getItem('userToken') !== null) {
          this.token = localStorage.getItem('userToken');
          {
            this._AddToCartService.getLoggedUserCart(this.token).subscribe({
              next: (Response) => {
                this.cartData = Response.data;
                console.log(this.cartData);
              },
              error: (err) => {
                console.log(err);
              },
            });
          }
        } else {
          this._Router.navigate(['./login']);
        }
      },
    });
  }
  logOut() {
    this._AuthenticationService.logOut();
  }
}
