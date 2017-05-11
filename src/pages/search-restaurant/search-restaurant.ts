import { Component,OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Service } from '../../app/service';

/*
  Generated class for the SearchRestaurant page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search-restaurant',
  templateUrl: 'search-restaurant.html'
})
export class SearchRestaurantPage implements OnInit{
  name:any;
  companies:any;
  open:any;
  distances:any;
  BASE_URL:any;
  PlacesUrl:any = 'http://mobiledeals.sooperior.com/place/searchRestaurantByName?city=Windsor&start=0&address=3160 wildwood&state=Ontario&name=';
  constructor(private service: Service, public navCtrl: NavController, public navParams: NavParams) {
    this.name = navParams.get('name');
  }
  getRestaurants() {
    this.service.getSearchPlaces(this.PlacesUrl+this.name)
        .subscribe(
            data => {
              this.companies = data.companies;
              this.open = data.open;
              this.distances = data.distances;
              this.BASE_URL = data.BASE_URL;
            });
  }
  ngOnInit(): void {
    this.getRestaurants();
  }

}
