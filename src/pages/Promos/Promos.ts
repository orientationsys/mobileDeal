import { Component,OnInit } from '@angular/core';

import { Deals } from '../../app/deals';

import { Service } from '../../app/service';

@Component({
  selector: 'page-home',
  templateUrl: 'Promos.html'
})
export class PromosPage implements OnInit{

  deals: Deals[];
  deals1: Deals;
  baseurl:any;
  open:any;
  mealTime:any;
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
          this.mealTime = this.deals[3];
          });
  }
  categoryFilter(event, category){
      this.service.getCategoryDeals(category)
          .subscribe(
              deals => {
                  this.deals = deals;
                  this.deals1 = this.deals[0];
                  this.baseurl = this.deals[4];
                  this.open = this.deals[2];
                  this.distances = this.deals[1];
                  this.media = this.deals[5];
                  this.mealTime = this.deals[3];
                  });
  }
  ngOnInit(): void {
    this.getDeals();
  }



}
