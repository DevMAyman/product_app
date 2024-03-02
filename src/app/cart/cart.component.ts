import { Component, OnInit } from '@angular/core';
import { AddToCartService } from '../add-to-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  token: any;
  cartData: any;
  constructor(
    private _AddToCartService: AddToCartService,
    private _Router: Router
  ) {}
  updateCartProductQuantity(
    productId: string,
    currentQuantity: number,
    currentQuantityPlus: number
  ) {
    if (localStorage.getItem('userToken') !== null) {
      this.token = localStorage.getItem('userToken');
      if (currentQuantity === 1) {
        this._AddToCartService.removeCart(productId, this.token).subscribe({
          next: (response) => (this.cartData = response.data),
          error: (err) => console.log(err),
        });
      } else {
        this._AddToCartService
          .updateCartProductQuantity(productId, this.token, currentQuantityPlus)
          .subscribe({
            next: (response) => (this.cartData = response.data),
            error: (err) => console.log(err),
          });
      }
    } else {
      this._Router.navigate(['./login']);
    }
  }
  removeCart(productId: string) {
    if (localStorage.getItem('userToken') !== null) {
      this.token = localStorage.getItem('userToken');
      this._AddToCartService.removeCart(productId, this.token).subscribe({
        next: (response) => {
          this.cartData = response.data;
          this._AddToCartService.userData.next(this.cartData);
        },
        error: (err) => console.log(err),
      });
    } else {
      this._Router.navigate(['./login']);
    }
  }
  ngOnInit(): void {
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
  }
}
