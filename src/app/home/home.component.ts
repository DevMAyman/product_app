import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Products } from '../products';
import { AddToCartService } from '../add-to-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productAdded: boolean = false;
  searchTerm: string = '';
  token: any = '';
  starRating: any[] = [];
  cartData: any;
  products: Products[] = [];
  constructor(
    private _ProductsService: ProductsService,
    private _AddToCartService: AddToCartService,
    private _Router: Router
  ) {}
  addToCard(productId: string) {
    if (localStorage.getItem('userToken') !== null) {
      this.token = localStorage.getItem('userToken');
      this._AddToCartService.addToCart(productId, this.token).subscribe({
        next: (response) => {
          this.productAdded = true;
          setTimeout(() => {
            this.productAdded = false;
          }, 1000);
          this.cartData = response.data;
          this._AddToCartService.userData.next(this.cartData);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this._Router.navigate(['./login']);
    }
  }
  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
    });
  }
}
