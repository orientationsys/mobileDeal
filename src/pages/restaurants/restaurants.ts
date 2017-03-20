import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Service } from '../../app/service';
import * as Leaflet from 'leaflet';
import * as L from 'mapbox.js';

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
  getRes(){
    this.Service.getResturants(this.url+this.id)
      .subscribe(
        data=>{
          this.company = data.company;
          this.BASE_URL = data.BASE_URL;
          this.open = data.open;
          this.deals = data.deals;
          this.lon = this.company.lon;
          this.lat = this.company.lat;
          this.drawMap(this.lat,this.lon);
        }
      )

  }
  drawMap(lat,lon): void {
    var map = Leaflet.map('map').setView([lat,lon], 12);

    Leaflet.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ211bWJ5MTk3NSIsImEiOiJjaXYwaG1xMmowNXRqMnVwZDUwb21pbnoxIn0.12gFstSYlZzXmFRvHlIL6A").addTo(map);
    var popup = Leaflet.popup()
    .setLatLng([lat,lon]).setContent('<p>popup.</p>');
    var laylet = Leaflet.marker([lat,lon]).addTo(map).bindPopup(popup);
  }
  ngOnInit(){
    this.getRes();
  }
}
