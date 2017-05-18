import { Component,OnInit } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { Service } from '../../app/service';
import { RestaurantsPage } from '../restaurants/restaurants';
import { Storage } from '@ionic/storage';
import { PromosDetailPage } from '../promos-detail/promos-detail';
import { DetailMapPage } from '../detail-map/detail-map';
import { PromosPreviewPage } from '../../pages/promos-preview/promos-preview';
/*
  Generated class for the RestaurantPromos page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-restaurant-promos',
  templateUrl: 'restaurant-promos.html'
})
export class RestaurantPromosPage implements OnInit{
  restaurantPromosUrl = 'http://mobiledeals.sooperior.com/deal/restaurantPromos?city=Windsor&address=3160 wildwood&state=Ontario&id_company=';
  id_company:any;
  data:any;
  deals: any;
  BASE_URL:any;
  open:any;
  distances:any;
  media:any = [];
  token:any;
  email:any;
  storage:any;
  constructor(private service: Service,public navCtrl: NavController,public modalCtrl: ModalController, public navParams: NavParams,storage: Storage) {
    this.id_company = navParams.get('id_company');
    this.storage = storage;
  }
  ngOnInit(): void {
    this.service.getRestaurantDeals(this.restaurantPromosUrl+this.id_company)
        .subscribe(
            data => {
              this.data = data;
              this.deals = data.deals;
              this.BASE_URL = data.BASE_URL;
              this.open = data.open;
              this.distances = data.distances;
              this.media = data.media;
            });
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
  goToMap(id) {
    this.navCtrl.push(DetailMapPage,{id:id});
  }
  photoDetail(photo, name){
    let profileModal = this.modalCtrl.create(PromosPreviewPage, { photo: photo, name:name , BASE_URL:this.BASE_URL});
    profileModal.present();
  }
}
