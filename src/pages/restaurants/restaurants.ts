import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Service } from '../../app/service';
import { RestaurantMediaPage } from '../../pages/restaurant-media/restaurant-media';
import * as Leaflet from 'leaflet';
import * as L from 'mapbox.js';
import { ResturantMenuPage } from '../resturant-menu/resturant-menu';

@Component({
  selector: 'page-restaurants',
  templateUrl: 'restaurants.html'
})

export class RestaurantsPage implements OnInit {
  company:any = {};
  id:any;
  url:any = 'http://mobiledeals.sooperior.com/place/detail?id_company=';
  likeurl:any = 'http://mobiledeals.sooperior.com/place/like?id_company=';
  BASE_URL:any;
  open:any;
  deals:any;
  lat:any;
  lon:any;
  likeFlag:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Service:Service) {
    this.id = navParams.get('id');
  }
  //获取数据
  getRes(){
    this.Service.getResturants(this.url+this.id)
      .subscribe(
        data=>{
          this.deals = data.deals;
          this.company  = data.company;
          this.BASE_URL = data.BASE_URL;
          this.open = data.open;
          this.lon = this.company.lon;
          this.lat = this.company.lat;
          this.likeFlag = data.likeFlag;
          this.drawMap(this.lat,this.lon);
        }
      )

  }
  //map
  drawMap(lat,lon): void {
    var map = Leaflet.map('map').setView([lat,lon], 12);

    Leaflet.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ211bWJ5MTk3NSIsImEiOiJjaXYwaG1xMmowNXRqMnVwZDUwb21pbnoxIn0.12gFstSYlZzXmFRvHlIL6A").addTo(map);
    var popup = Leaflet.popup()
    .setLatLng([lat,lon]).setContent('<p>popup.</p>');
    var laylet = Leaflet.marker([lat,lon]).addTo(map).bindPopup(popup);
  }
  //go to resturant-menu
  goToResturantMenu(id,logo){
    this.navCtrl.push(ResturantMenuPage,{id:id,logo:logo});
  }
    likeRestaurant(){
        this.Service.likeResturants(this.likeurl+this.id)
            .subscribe(
                data=>{
                    this.likeFlag = data.likeFlag;
                }
            )
    }
      ngOnInit(){
        this.getRes();
      }
        mediaPage(id_company){
            this.navCtrl.push(RestaurantMediaPage, {id_company: id_company});
        }
}
