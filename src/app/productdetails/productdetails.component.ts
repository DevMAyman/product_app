import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AddToCartService } from '../add-to-cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
})
export class ProductdetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _AddToCartService: AddToCartService,
    private _Router: Router
  ) {}
  productId: any;
  cartData: any;
  productAdded: boolean = false;
  token: any;
  productDetails: any;
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
    this._ActivatedRoute.paramMap.subscribe((param) => {
      this.productId = param.get('id');
      this._ProductsService.getProductsDetails(this.productId).subscribe({
        next: (response) => (this.productDetails = response.data),
      });
    });
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
}
