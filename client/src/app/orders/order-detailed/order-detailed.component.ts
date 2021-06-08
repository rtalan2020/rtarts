import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/models/order';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';
import { IBasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {
  order: IOrder;
  orderBasket: IBasketItem[] =[];

  constructor(private route: ActivatedRoute, private breadcrumService: BreadcrumbService,
              private orderService: OrdersService) {
                this.breadcrumService.set('@OrderDetailed', '');
              }

  ngOnInit(): void {
    this.orderService.getOrderDetailed(+this.route.snapshot.paramMap.get('id'))
      .subscribe((order: IOrder) => {
        this.order = order;
        var tempBasket: IBasketItem = null;        
        order.orderItems.forEach(element => {
            tempBasket = {
              id: element.productId,
              price: element.price,
              pictureUrl: element.pictureUrl,
              quantity: element.quantity,
              productName: element.productName,
              brand: null,
              type: null
          }
          this.orderBasket.push(tempBasket);
        });
        console.log(this.orderBasket);

        this.breadcrumService.set('@OrderDetailed', `Order# ${order.id} - ${order.status}`);
      }, error => {
        console.log(error);
      });
  }

}
