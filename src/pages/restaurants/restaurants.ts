import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Service } from '../../app/service';
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
  BASE_URL:any;
  open:any;
  deals:any;
  lat:any;
  lon:any;
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
  ngOnInit(){
    this.getRes();
  }
}
