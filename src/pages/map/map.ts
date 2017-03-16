import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

import * as Leaflet from 'leaflet';

import { Service } from '../../app/service';



@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage implements OnInit{

  //ajax

  data: any;
  companies:any;
  constructor(private service: Service,public navCtrl: NavController) {
  }
  PlacesUrl:any = 'http://mobiledeals.sooperior.com/searchRestaurant?city=Windsor&start=0&address=3160 wildwood&state=Ontario';
  getPlaces():void{
    this.service.getPlaces(this.PlacesUrl)
      .subscribe(
        data => {
          this.companies = data.companies;
          this.getLocation();
        });
  }
  //获取所有list的经纬度
  lon:Array<any> = [];
  lat:Array<any> = [];
  getLocation(){
    for(let x = 0;x<this.companies.length;x++){
      let lon1 = this.companies[x].lon;
      let lat1 = this.companies[x].lat;
      this.lon.push(lon1);
      this.lat.push(lat1);
      console.log(this.lon);
      console.log(this.lat);
    }
    this.drawMap(this.lon,this.lat,this.companies.length);
  }

  //生命周期钩子
  ngOnInit(): void {
    this.getPlaces();
  }

  //map leaftlet
  drawMap(lon,lat,l): void {
    var map = Leaflet.map('map').setView([51.505, -0.09], 13);

    Leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    for(let i = 0;i<l;i++){
      Leaflet.marker([lat[i],lon[i]]).addTo(map).bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();;
    }
    var popup = Leaflet.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }

    map.on('click', onMapClick);
  }
}
