import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IBasketItem, IBasket } from '../../models/basket';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
  @Output() decrement: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() increment: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() remove: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Input() isBasket:boolean;
  @Input() items: IBasketItem[] = [];
  @Input() isOrder: boolean;

  constructor() { }

  ngOnInit(): void { }

  decrementItemQuantity(item: IBasketItem)
  {
    this.decrement.emit(item);
  }

  incrementItemQuantity(item: IBasketItem)
  {
    this.increment.emit(item);
  }

  removeBasketItem(item: IBasketItem)
  {
    this.remove.emit(item);
  }

}
