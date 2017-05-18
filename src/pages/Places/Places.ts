import { Component,OnInit } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import { Service } from '../../app/service';
import { MapPage } from '../map/map';
import { RestaurantsPage } from '../restaurants/restaurants';
import { SearchRestaurantPage } from '../search-restaurant/search-restaurant';
import { RestaurantFilterPage } from '../restaurant-filter/restaurant-filter';
import { Storage } from '@ionic/storage';
import { RestaurantPromosPage } from '../restaurant-promos/restaurant-promos'
import { DetailMapPage } from '../detail-map/detail-map';
import { Geolocation } from 'ionic-native';
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
    searchUrl = 'http://mobiledeals.sooperior.com/place/getSearchRestaurantName?name=';
    token:any;
    email:any;
    storage:any;
    fastFood:any = "icon-nav-1.png";
    fastFoodActive:any = "";
    delivery:any = "icon-nav-2.png";
    deliveryActive:any = "";
    site:any = "icon-nav-3.png";
    siteActive:any = "";
    start:any = 0;
    lat:any =0 ;
    lon:any = 0;
    locationAllow:any = false;
    loadInfo:any = false;
  constructor(private service: Service,public navCtrl: NavController,public modalCtrl: ModalController,storage: Storage) {
      this.storage = storage;
  }
  PlacesUrl:any = 'http://mobiledeals.sooperior.com/searchRestaurant?start=';
  filterUrl:any = 'http://mobiledeals.sooperior.com/place/restaurantFilter?start=0';
  getPlaces():void{

  }
    ionViewWillEnter(){
        Promise.all([
            this.storage.get('locationAllow')
        ])
            .then(([locationAllow]) => {
                this.locationAllow = locationAllow;
                if (this.locationAllow && !this.loadInfo) {
                    Geolocation.getCurrentPosition().then(res => {
                        this.lat = res.coords.latitude;
                        this.lon = res.coords.longitude;
                        // this.lat = 42.273666;
                        // this.lon = -82.990686;
                        this.service.getPlaces(this.PlacesUrl+this.start+"&lat="+this.lat+"&lon="+this.lon)
                            .subscribe(
                                data => {
                                    this.companies = data.companies;
                                    this.open = data.open;
                                    this.distances = data.distances;
                                    this.BASE_URL = data.BASE_URL;
                                    this.loadInfo = true;
                                });
                    }).catch((error) => {
                        console.log('Error getting location', error);
                    });
                }
            });

    }
    turnOnLocation(){
        this.storage.set('locationAllow', true);
        Geolocation.getCurrentPosition().then(res => {
            this.locationAllow = true;
            this.lat = res.coords.latitude;
            this.lon = res.coords.longitude;
            // this.lat = 42.273666;
            // this.lon = -82.990686;
            this.service.getPlaces(this.PlacesUrl+this.start+"&lat="+this.lat+"&lon="+this.lon)
                .subscribe(
                    data => {
                        this.companies = data.companies;
                        this.open = data.open;
                        this.distances = data.distances;
                        this.BASE_URL = data.BASE_URL;
                        this.loadInfo = true;
                    });
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }
  //go to map
  goMap(){
    this.navCtrl.push(MapPage);
  }
  //go to restaurants
  goRestaurants(id){
      Promise.all([
          this.storage.get('token'),
          this.storage.get('email')
      ])
      .then(([token, email]) => {
          this.token = token;
          this.email = email;
          this.navCtrl.push(RestaurantsPage,{id:id,email:this.email,token:this.token});
      })
  }
  //切换列表所发送的ajax请求
  categoryFilter(event, category){
      if (category == "Fast Food") {
          this.fastFood = "icon-nav-new-1.png";
          this.fastFoodActive = "active";
          this.delivery = "icon-nav-2.png";
          this.deliveryActive = "";
          this.site = "icon-nav-3.png";
          this.siteActive = "";
      } else if (category == "Delivery/Take Out") {
          this.fastFood = "icon-nav-1.png";
          this.fastFoodActive = "";
          this.delivery = "icon-nav-new-2.png";
          this.deliveryActive = "active";
          this.site = "icon-nav-3.png";
          this.siteActive = "";
      } else if (category == "Sit Down Restaurant") {
          this.fastFood = "icon-nav-1.png";
          this.fastFoodActive = "";
          this.delivery = "icon-nav-2.png";
          this.deliveryActive = "";
          this.site = "icon-nav-new-3.png";
          this.siteActive = "active";
      }
    this.service.getCategoryPlaces("http://mobiledeals.sooperior.com/place/getRestaurantsByFilter?start=0&category="+category+"&lat="+this.lat+"&lon="+this.lon)
          .subscribe(
              data => {
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
            var url = this.filterUrl+"&lat="+this.lat+"&lon="+this.lon;
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
    // this.getPlaces();
  }
  //callphone
  callphone(phoneNumber){
    window.location= "tel:"+phoneNumber;
  }
  search(value){
      if(value!=""){
          this.clearBoolean = true;
          this.seacrchBoolean2 = true;
          this.service.getRestaurantSearch(this.searchUrl+value+"&lat="+this.lat+"&lon="+this.lon)
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
    restaurantProms(id) {
        this.navCtrl.push(RestaurantPromosPage,{id_company:id});
    }
    doInfinite(infiniteScroll) {
        this.start = this.start+1;
        this.service.getPlaces(this.PlacesUrl+this.start+"&lat="+this.lat+"&lon="+this.lon)
            .subscribe(
                data => {
                    // this.deals = data.deals;
                    for(let company of data.companies) {
                        this.companies.push(company);
                    }
                    for (let key in data.open) {
                        this.open[key] = data.open[key];
                    }
                    for (let key in data.distances) {
                        this.distances[key]  = data.distances[key];
                    }
                    infiniteScroll.complete();
                });
    }
    goToMap(id) {
        this.navCtrl.push(DetailMapPage,{id:id});
    }
}
