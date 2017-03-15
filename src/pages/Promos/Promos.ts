import { Component,OnInit } from '@angular/core';

import { Deals } from '../../app/deals';

import { Service } from '../../app/service';

@Component({
  selector: 'page-home',
  templateUrl: 'Promos.html'
})
export class PromosPage implements OnInit{
  data:any;
  deals: any;
  baseurl:any;
  open:any;
  mealTime:any;
  distances:any;
  media:any;
  BASE_URL:any;
  constructor(private service: Service) {
  }
  getDeals():void{
    this.service.getDeals()
      .subscribe(
        data => {
          this.data = data;
          this.deals = data.deals;
          this.BASE_URL = data.BASE_URL;
          this.open = data.open;
          this.distances = data.distances;
          this.media = data.media;
          this.mealTime = data.mealTime;
          });
  }
  categoryFilter(event, category){
      this.service.getCategoryDeals(category)
          .subscribe(
              data => {
                this.data = data;
                this.deals = data.deals;
                this.BASE_URL = data.BASE_URL;
                this.open = data.open;
                this.distances = data.distances;
                this.media = data.media;
                this.mealTime = data.mealTime;
                  });
  }
  ngOnInit(): void {
    this.getDeals();
  }



}
