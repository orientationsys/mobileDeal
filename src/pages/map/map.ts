import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

import * as Leaflet from 'leaflet';
import * as L from 'mapbox.js';
import { Service } from '../../app/service';
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage implements OnInit{
  //头部导航条图片链接以及isActive的true or false
  isACT1: any = false;
  isACT2: any = false;
  isACT3: any = false;
  isACT4: any = false;
  nvImg1: any = 'assets/img/icon-nav-1.png';
  nvImg2: any = 'assets/img/icon-nav-2.png';
  nvImg3: any = 'assets/img/icon-nav-3.png';
  nvImg4: any = 'assets/img/icon-nav-4.png';
  nvImgAct1: any = 'assets/img/icon-nav-new-1.png';
  nvImgAct2: any = 'assets/img/icon-nav-new-2.png';
  nvImgAct3: any = 'assets/img/icon-nav-new-3.png';
  nvImgAct4: any = 'assets/img/icon-nav-new-4.png';

  //ajax

  data: any;
  companies:any;
  open:any;
  distances:any;
  BASE_URL:any;
  deals:any;
  media:any;
  mealTime:any;
  selectId:any;
  constructor(private service: Service,public navCtrl: NavController) {
  }
  PlacesUrl:any = 'http://mobiledeals.sooperior.com/searchRestaurant?city=Windsor&start=0&address=3160 wildwood&state=Ontario';
  getPlaces():void{
    this.service.getPlaces(this.PlacesUrl)
      .subscribe(
        data => {
          this.companies = data.companies;
          this.getLocation();
          this.open = data.open;
          this.distances = data.distances;
          this.BASE_URL = data.BASE_URL;
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
    this.drawMap(this.lon,this.lat,this.companies.length,this.companies);
  }

  //生命周期钩子
  ngOnInit(): void {
    this.getPlaces();
  }
  //map leaftlet
  drawMap(lon,lat,l,company): void {
    var map = Leaflet.map('map').setView([lat[0],lon[0]], 12);

    Leaflet.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ211bWJ5MTk3NSIsImEiOiJjaXYwaG1xMmowNXRqMnVwZDUwb21pbnoxIn0.12gFstSYlZzXmFRvHlIL6A").addTo(map);
    for(let i = 0;i<l;i++){
      var popup = Leaflet.popup()
      .setLatLng([lat[i],lon[i]]).setContent('<p>popup.</p>');
      var laylet = Leaflet.marker([lat[i],lon[i]]).addTo(map).bindPopup(popup);
      laylet._myId = company[i]["id_company"];
    }
     map.on("popupopen", function (e) {
       this.selectId = e.popup._source._myId;
    })
  }
}
