import { Component,OnInit } from '@angular/core';

import { NavController,ModalController } from 'ionic-angular';

import { Service } from '../../app/service';

import { MapPage } from '../map/map';

import { RestaurantsPage } from '../restaurants/restaurants';
import { SearchRestaurantPage } from '../search-restaurant/search-restaurant';
import { RestaurantFilterPage } from '../restaurant-filter/restaurant-filter';

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
    seacrchBoolean:any = false;
    seacrchBoolean2:any = false;
    clearBoolean:any = false;
    searchData:any = {};
    searchUrl = 'http://mobiledeals.sooperior.com/place/getSearchRestaurantName?city=Windsor&name=';
  constructor(private service: Service,public navCtrl: NavController,public modalCtrl: ModalController) {
  }
  PlacesUrl:any = 'http://mobiledeals.sooperior.com/searchRestaurant?city=Windsor&start=0&address=3160 wildwood&state=Ontario';
  filterUrl:any = 'http://mobiledeals.sooperior.com/place/restaurantFilter?city=Windsor&start=0&address=3160%20wildwood&state=Ontario';
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
      let filterModal = this.modalCtrl.create(RestaurantFilterPage);
      filterModal.onDidDismiss(data => {
          this.getRestaurantByFilter(data);
      });
      filterModal.present();
  }
    getRestaurantByFilter(data):void {
        if (data) {
            var url = this.filterUrl;
            data.tags.forEach(function (e) {
                url += "&tags[]=" + e;
            })
            if (data.sort) {
                url += "&sort=" + data.sort;
            }
            this.service.getFilterRestaurantList(url)
                .subscribe(
                    data => {
                        this.companies = data.companies;
                        this.open = data.open;
                        this.distances = data.distances;
                        this.BASE_URL = data.BASE_URL;
                    });

        }
    }
  //生命周期钩子
  ngOnInit(): void {
    this.getPlaces();
  }
  //callphone
  callphone(phoneNumber){
    window.location= "tel:"+phoneNumber;
  }
  search(value){
      if(value!=""){
          this.clearBoolean = true;
          this.seacrchBoolean2 = true;
          this.service.getRestaurantSearch(this.searchUrl+value)
              .subscribe(
                  data=>{
                      this.searchData = data;
                      if(this.searchContent == ''){
                          this.searchData = '';
                          this.seacrchBoolean2 = false;
                          this.clearBoolean = false;
                      }
                  }
              )
      }
      if(this.searchContent == ''){
          this.searchData = '';
          this.seacrchBoolean2 = false;
          this.clearBoolean = false;
      }
  }
    searchContent:any;
    clearAll(){
        this.searchContent = '';
        this.searchData = '';
        this.seacrchBoolean2 = false;
        this.clearBoolean = false;
    }
    openSearchBox(){
        this.seacrchBoolean = true;
    }
    //关闭搜索框
    closeSearchBox(){
        this.seacrchBoolean = false;
        this.seacrchBoolean2 = false;
    }
    restaurantsSearchDetail(name){
        this.navCtrl.push(SearchRestaurantPage,{name:name});
    }
}
