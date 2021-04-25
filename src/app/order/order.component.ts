import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { RadioOption } from 'app/shared/radio/radio-option.component';
import { OrderService } from './order-service';
import { Order, OrderItem } from './order.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {

  paymentOptions: RadioOption[] = [
    {label:'Denheiro', value: 'MON'},
    {label:'Cartão de Débito', value: 'DEB'},
    {label:'Cartão de Refeição', value: 'REF'},
  ]

  orderForm: FormGroup
  delivery: number = 8
  
  constructor(
    private orderService: OrderService,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.orderForm = this._formBuilder.group({
      name : this._formBuilder.control(''),
      email: this._formBuilder.control(''),
      emailConfirmation: this._formBuilder.control(''),
      address: this._formBuilder.control(''),
      number: this._formBuilder.control(''),
      optionalAddress: this._formBuilder.control(''),
      paymentOption: this._formBuilder.control(''),
    });
  }

  cartItems(): CartItem[]{
    return this.orderService.cartItems()
  }

  itemsValue() : number {
    return this.orderService.itemsValue()
  }

  increaseQty(item: CartItem){
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.orderService.remove(item)
  }

  checkoutOrder(order: Order){
    order.orderItems = this.cartItems().map((item: CartItem)=>  new OrderItem(
      item.quantity,
      item.menuItem.id
    ))

    this.orderService.checkOrder(order).subscribe((orderId)=>{
      this.orderService.clear()
      this._router.navigate(['/order-summary'])
    })
  }

}
