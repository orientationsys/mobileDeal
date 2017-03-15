import { Component,OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Service } from '../../app/service';

@Component({
  selector: 'page-Places',
  templateUrl: 'Places.html'
})
export class PlacesPage implements OnInit{
  data: any;
  companies:any;
  open:any;
  distances:any;
  BASE_URL:any;
  constructor(private service: Service) {
  }
  PlacesUrl:any = 'http://mobiledeals.sooperior.com/searchRestaurant?city=Windsor&start=0&address=3160 wildwood&state=Ontario';
  getPlaces():void{
    this.service.getPlaces(this.PlacesUrl)
      .subscribe(
        data => {
          this.companies = data.companies;
          this.open = data.open;
          this.distances = data.distances;
          this.BASE_URL = data.BASE_URL;
        });
  }
  // categoryFilter(event, category){
  //   this.service.getCategoryDeals(category)
  //     .subscribe(
  //       deals => {
  //         this.deals = deals;
  //         this.deals1 = this.deals[0];
  //         this.baseurl = this.deals[4];
  //         this.open = this.deals[2];
  //         this.distances = this.deals[1];
  //         this.media = this.deals[5];
  //         this.mealTime = this.deals[3];
  //       });
  // }
  ngOnInit(): void {
    this.getPlaces();
  }

}
