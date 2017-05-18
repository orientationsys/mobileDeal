import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Service } from '../../app/service';
import * as Leaflet from 'leaflet';
import * as L from 'mapbox.js';
/*
  Generated class for the DetailMap page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail-map',
  templateUrl: 'detail-map.html'
})
export class DetailMapPage implements OnInit{
  id:any;
  company:any;
  lon:any;
  lat:any;
  name:any;
  url:any = 'http://mobiledeals.sooperior.com/place/detail?id_company=';
  constructor(private service: Service,public navCtrl: NavController, public navParams: NavParams) {
    this.id = navParams.get('id');
  }
  ngOnInit(): void {
    this.service.getResturants(this.url+this.id)
        .subscribe(
            data => {
              this.company = data.company;
              this.name = this.company.name;
              this.lon = this.company.lon;
              this.lat = this.company.lat;
                console.log(this.lat);
                console.log(this.lon);
              this.drawMap(this.lat,this.lon);
            });

  }
  drawMap(lat,lon): void {
    var map = Leaflet.map('map').setView([lat,lon], 12);
    Leaflet.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ211bWJ5MTk3NSIsImEiOiJjaXYwaG1xMmowNXRqMnVwZDUwb21pbnoxIn0.12gFstSYlZzXmFRvHlIL6A").addTo(map);
    var popup = Leaflet.popup()
        .setLatLng([lat,lon]).setContent('<p>popup.</p>');
    var laylet = Leaflet.marker([lat,lon]).addTo(map).bindPopup(popup);
  }
}
