import { Component,OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Service } from '../../app/service';

import { MapPage } from '../map/map';

import { RestaurantsPage } from '../restaurants/restaurants';
declare var window;
@Component({
  selector: 'page-Places',
  templateUrl: 'Places.html',
  styleUrls: ['/pages/Places/Places.scss']
})
export class PlacesPage implements OnInit{
  //头部导航条图片链接以及isActive的true or false
  selectCategory:any;

  //ajax

  data: any;
  companies:any;
  open:any;
  distances:any;
  BASE_URL:any;
  deals:any;
  media:any;
  mealTime:any;
  constructor(private service: Service,public navCtrl: NavController) {
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
          console.log( data.distances);
        });
  }
  //go to map
  goMap(){
    this.navCtrl.push(MapPage);
  }
  //go to restaurants
  goRestaurants(id){
      console.log(id);
      this.navCtrl.push(RestaurantsPage,{id:id});
  }
  //切换列表所发送的ajax请求
  categoryFilter(event, category){
    this.selectCategory = category;
    this.service.getCategoryPlaces("http://mobiledeals.sooperior.com/place/getRestaurantsByFilter?city=Windsor&start=0&address=3160 wildwood&state=Ontario&category="+category)
          .subscribe(
              data => {
                console.log(data);
                this.companies = data.companies;
                this.open = data.open;
                this.distances = data.distances;
                this.BASE_URL = data.BASE_URL;
              });
  }
  actFilter(){

  }
  //生命周期钩子
  ngOnInit(): void {
    this.getPlaces();
  }
  //callphone
  callphone(phoneNumber){
    window.location= "tel:"+phoneNumber;
  }
}
