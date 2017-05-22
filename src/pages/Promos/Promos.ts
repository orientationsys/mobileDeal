import { Component,OnInit } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import { Service } from '../../app/service';
import { PromosDetailPage } from '../promos-detail/promos-detail';
import { PromosPreviewPage } from '../../pages/promos-preview/promos-preview';
import { FilterPage } from '../../pages/filter/filter';
import { seacrhPage } from '../searchPage/searchPage';
import { Storage } from '@ionic/storage';
import { RestaurantsPage } from '../restaurants/restaurants';
import { DetailMapPage } from '../detail-map/detail-map';
import { RestaurantPromosPage } from '../restaurant-promos/restaurant-promos';
import { Geolocation } from '@ionic-native/geolocation';
@Component({
  selector: 'page-promos',
  templateUrl: 'Promos.html'
})
export class PromosPage implements OnInit{
  selectCategory:any;
  seacrchBoolean:any = false;
  seacrchBoolean2:any = false;
  clearBoolean:any = false;
  //ajax所拿到的各项值
  url:any = 'http://mobiledeals.sooperior.com/deal/getDealNameBySearch?name=';
  filterUrl:any = 'http://mobiledeals.sooperior.com/deal/searchByFilter?start=0';
  getCategoryUrl = 'http://mobiledeals.sooperior.com/deal/getDealsByFilter?start=0&category=';
    data:any;
  deals: any;
  baseurl:any;
  open:any;
  mealTime:any;
  distances:any;
  media:any = [];
  BASE_URL:any;
  searchData:any = {};
  token:any;
  email:any;
  storage:any;
  fastFood:any = "icon-nav-1.png";
  fastFoodActive:any = "";
  delivery:any = "icon-nav-2.png";
  deliveryActive:any = "";
  site:any = "icon-nav-3.png";
  siteActive:any = "";
  start = 0;
  lat:any =0 ;
  lon:any = 0;
  locationerror:any;
  locationAllow:any = false;
  loadInfo:any = false;
  result:any = true;
  getCityUrl = 'http://mobiledeals.sooperior.com/searchDeal?start=';  // URL to web api
  constructor(private service: Service,public navCtrl: NavController,public modalCtrl: ModalController,storage: Storage,private geolocation: Geolocation) {
      this.storage = storage;
  }
  //ajax获取deals
  getDeals():void{

  }
    ionViewWillEnter(){
        Promise.all([
            this.storage.get('locationAllow')
        ])
        .then(([locationAllow]) => {
            this.locationAllow = locationAllow;
            if (this.locationAllow && !this.loadInfo) {
                this.geolocation.getCurrentPosition().then(res => {
                    this.lat = res.coords.latitude;
                    this.lon = res.coords.longitude;
                    // this.lat = 42.273666;
                    // this.lon = -82.990686;
                    this.service.getDeals(this.getCityUrl + this.start + "&lat=" + this.lat + "&lon=" + this.lon)
                        .subscribe(
                            data => {
                                this.data = data;
                                this.deals = data.deals;
                                this.BASE_URL = data.BASE_URL;
                                this.open = data.open;
                                this.distances = data.distances;
                                this.media = data.media;
                                this.mealTime = data.mealTime;
                                this.loadInfo = true;
                                this.result = data.result;
                            });
                }).catch((error) => {
                    console.log('Error getting location', error);
                    this.locationerror = error.message;
                });
            }
        });

    }
    turnOnLocation(){
        this.storage.set('locationAllow', true);
        this.geolocation.getCurrentPosition().then(res => {
            this.locationAllow = true;
            this.lat = res.coords.latitude;
            this.lon = res.coords.longitude;
            // this.lat = 42.273666;
            // this.lon = -82.990686;
            this.service.getDeals(this.getCityUrl+this.start+"&lat="+this.lat+"&lon="+this.lon)
                .subscribe(
                    data => {
                        this.data = data;
                        this.deals = data.deals;
                        this.BASE_URL = data.BASE_URL;
                        this.open = data.open;
                        this.distances = data.distances;
                        this.media = data.media;
                        this.mealTime = data.mealTime;
                        this.result = data.result;
                        this.loadInfo = true;
                    });
        }).catch((error) => {
            console.log('Error getting location', error);
            this.locationerror = error.message;
        });
    }
  //切换列表所发送的ajax请求
  categoryFilter(event, category) {

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
    this.service.getCategoryDeals(this.getCategoryUrl+category+"&lat="+this.lat+"&lon="+this.lon)
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
      // this.getDeals();
  }
  //跳转到detail页面
  getDetailPromos(promos) {
      Promise.all([
          this.storage.get('token'),
          this.storage.get('email')
      ])
      .then(([token, email]) => {
          this.token = token;
          this.email = email;
          this.navCtrl.push(PromosDetailPage,{promos:promos,BASE_URL:this.BASE_URL,email:this.email,token:this.token});
      })

  }
    restaurantProms(id) {
        this.navCtrl.push(RestaurantPromosPage,{id_company:id});
    }
  goToMap(id) {
      this.navCtrl.push(DetailMapPage,{id:id});
  }
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
  //查看图片大图
  photoDetail(photo, name){
    let profileModal = this.modalCtrl.create(PromosPreviewPage, { photo: photo, name:name , BASE_URL:this.BASE_URL});
    profileModal.present();
  }
    actFilter(){
        let filterModal = this.modalCtrl.create(FilterPage);
        filterModal.onDidDismiss(data => {
            this.getDealsByFilter(data);
        });
        filterModal.present();
    }
    getDealsByFilter(data):void{
        if (data) {
            var url = this.filterUrl+"&lat="+this.lat+"&lon="+this.lon;
            data.tags.forEach(function (e) {
                url += "&tags[]="+e;
            })
            data.types.forEach(function (e) {
                url += "&types[]="+e;
            })
            if (data.sort) {
                url += "&sort="+data.sort;
            }
            this.service.getFilterList(url)
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

    }
  //搜索模块
  search(value){
    if(value!=""){
      this.clearBoolean = true;
      this.seacrchBoolean2 = true;
      this.service.getSearch(this.url+value+"&lat="+this.lat+"&lon="+this.lon)
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
  //打开搜索框
  openSearchBox(){
    this.seacrchBoolean = true;
  }
  //关闭搜索框
  closeSearchBox(){
    this.seacrchBoolean = false;
    this.seacrchBoolean2 = false;
  }
  //清空搜索框
  searchContent:any;
  clearAll(){
    this.searchContent = '';
    this.searchData = '';
    this.seacrchBoolean2 = false;
    this.clearBoolean = false;
  }
  //搜索list->detail
  goToSearchDetail(name){
    this.navCtrl.push(seacrhPage,{name:name});
  }
    doInfinite(infiniteScroll) {
        this.start = this.start+1;
        this.service.getDeals(this.getCityUrl+this.start+"&lat="+this.lat+"&lon="+this.lon)
            .subscribe(
                data => {
                    this.data = data;
                    // this.deals = data.deals;
                    for(let deal of data.deals) {
                       this.deals.push(deal);
                    }
                    for (let key in data.open) {
                        this.open[key] = data.open[key];
                    }
                    for (let key in data.distances) {
                        this.distances[key]  = data.distances[key];
                    }
                    for (let key in  data.media) {
                        this.media[key] = data.media[key];
                    }
                    infiniteScroll.complete();
                });
    }

}
