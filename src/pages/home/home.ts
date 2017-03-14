import { Component,OnInit } from '@angular/core';

import { Deals } from '../../app/deals';

import { Service } from '../../app/service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  deals: Deals[];
  deals1: Deals;
  baseurl:any;
  open:any;
  meal:any;
  distances:any;
  media:any;
  constructor(private service: Service) {
  }
  getDeals():void{
    this.service.getDeals()
      .subscribe(
        deals => {
          this.deals = deals;
          this.deals1 = this.deals[0];
          this.baseurl = this.deals[4];
          this.open = this.deals[2];
          this.distances = this.deals[1];
          this.media = this.deals[5];
          this.meal = this.deals[3];
          console.log(this.deals)});
  }
  ngOnInit(): void {
    this.getDeals();
  }



}
