import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketItem } from 'src/app/shared/models/basket';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity = 0;
  addsub = "Add";

  constructor(private shopService: ShopService,
    private activateRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService
  ) {
    this.bcService.set('@productDetails', '');

  }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(product => {
      this.product = product;
      this.bcService.set('@productDetails', product.name);
    }, error => {
      console.log(error);
    });
  }

   getCurrentProductInBasketCount(): number {
     const basket = this.basketService.getCurrentBasketValue();
     var productQuantity: number;
     if (basket) {
       const foundItemIndex = basket.items.findIndex(x => x.id === this.product.id);
       if (foundItemIndex >= 0)
         productQuantity = basket.items[foundItemIndex].quantity;
       else
         productQuantity = 0;
     }
     else
      productQuantity = 0;
    return productQuantity;
  }

  addItemToBasket(item: IProduct) {
    this.basketService.addItemToBasket(item, this.quantity);
    this.quantity = 0;
  }

  incrementQuantity() {
    this.quantity += 1;
    if (this.quantity < 0) 
      this.addsub = "Subtract";
    else
      this.addsub = "Add";
  }

  decrementQuantity() {
    if (this.quantity - 1 >= this.getCurrentProductInBasketCount()*-1){
      this.quantity--;
    }
    if (this.quantity < 0) 
      this.addsub = "Subtract";
    else
      this.addsub = "Add";
  }
}