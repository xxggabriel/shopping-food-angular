import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html',
})
export class RatingComponent implements OnInit {

  @Output() rated = new EventEmitter<number>()

  rates: number[] = [0, 1,2,3,4,5]
  rate:number = 0
  previosRate: number

  constructor() { }

  ngOnInit() {
  }

  setRate(rate){
    this.rate = rate 
    this.previosRate = undefined
    this.rated.emit(this.rate)
  }

  setTemporaryRate(r : number) {
    if(this.previosRate === undefined){
      this.previosRate = this.rate
    }

    this.rate = r 
  }

  clearTemporaryRate(){
    if(this.previosRate !== undefined){
      this.rate = this.previosRate
      this.previosRate = undefined
    }
  }

}
