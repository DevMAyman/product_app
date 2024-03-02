import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddToCartService {
  userData = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient) {}
  addToCart(productId: string, token: string): Observable<any> {
    return this._HttpClient.post(
      `https://route-ecommerce.onrender.com/api/v1/cart`,
      { productId: productId },
      { headers: { token: token } }
    );
  }
  getLoggedUserCart(token: string): Observable<any> {
    return this._HttpClient.get(
      `https://route-ecommerce.onrender.com/api/v1/cart`,
      { headers: { token: token } }
    );
  }
  removeCart(productId: string, token: string): Observable<any> {
    return this._HttpClient.delete(
      `https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,

      { headers: { token: token } }
    );
  }
  updateCartProductQuantity(
    productId: string,
    token: string,
    currentQuantity: number
  ): Observable<any> {
    return this._HttpClient.put(
      `https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
      { count: currentQuantity },
      { headers: { token: token } }
    );
  }
}
