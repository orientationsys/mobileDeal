import { Component,OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Service } from '../../app/service';

import { MapPage } from '../map/map'

@Component({
  selector: 'page-Places',
  templateUrl: 'Places.html',
  styleUrls: ['/pages/Places/Places.scss']
})
export class PlacesPage implements OnInit{
  //头部导航条图片链接以及isActive的true or false
  isACT1: any = true;
  isACT2: any = false;
  isACT3: any = false;
  isACT4: any = false;
  nvImg1: any = 'assets/img/icon-nav-new-1.png';
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
  constructor(private service: Service,public navCtrl: NavController) {
  }
  PlacesUrl:any = 'http://mobiledeals.sooperior.com/searchRestaurant?city=Windsor&start=0&address=3160 wildwood&state=Ontario';
  getPlaces():void{
    this.service.getPlaces(this.PlacesUrl)
      .subscribe(
        data => {
          this.companies = data.companies;
          this.open = data.open;
          this.distances = data.distances;
          this.BASE_URL = data.BASE_URL;
        });
  }
  //go to map
  goMap(){
    this.navCtrl.push(MapPage);

  }
  //切换列表所发送的ajax请求
  categoryFilter(event, category,act){
    this.isACT1 = false;
    this.isACT2 = false;
    this.isACT3 = false;
    this.isACT4 = false;
    if(act=='act1'){
      this.nvImg2 = 'assets/img/icon-nav-2.png';
      this.nvImg3 = 'assets/img/icon-nav-3.png';
      this.nvImg4 = 'assets/img/icon-nav-4.png';
      this.isACT1 = !this.isACT1;
      if(this.nvImg1 == 'assets/img/icon-nav-1.png'){
        this.nvImg1 = this.nvImgAct1;
      }else if(this.isACT1 == 'false'){
        this.nvImg1 = 'assets/img/icon-nav-1.png';
      }
    }else if(act=='act2'){
      this.nvImg1 = 'assets/img/icon-nav-1.png';
      this.nvImg3 = 'assets/img/icon-nav-3.png';
      this.nvImg4 = 'assets/img/icon-nav-4.png';
      this.isACT2 = !this.isACT2;
      if(this.nvImg2 == 'assets/img/icon-nav-2.png'){
        this.nvImg2 = this.nvImgAct2;
      }else if(this.isACT2 == 'false'){
        this.nvImg2 = 'assets/img/icon-nav-2.png';
      }
    }else if(act=='act3'){
      this.nvImg1 = 'assets/img/icon-nav-1.png';
      this.nvImg2 = 'assets/img/icon-nav-2.png';
      this.nvImg4 = 'assets/img/icon-nav-4.png';
      this.isACT3 = !this.isACT3;
      if(this.nvImg3 == 'assets/img/icon-nav-3.png'){
        this.nvImg3 = this.nvImgAct3;
      }else if(this.isACT3 == 'false'){
        this.nvImg3 = 'assets/img/icon-nav-3.png';
      }
    }
    this.service.getCategoryDeals(category)
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
  actFilter(){
    this.isACT1 = false;
    this.isACT2 = false;
    this.isACT3 = false;
    this.isACT4 = false;
    this.nvImg1 = 'assets/img/icon-nav-1.png';
    this.nvImg2 = 'assets/img/icon-nav-2.png';
    this.nvImg3 = 'assets/img/icon-nav-3.png';
    this.isACT4 = !this.isACT4;
    if(this.nvImg4 == 'assets/img/icon-nav-4.png'){
      this.nvImg4 = this.nvImgAct4;
    }else if(this.isACT4 == 'false'){
      this.nvImg4 = 'assets/img/icon-nav-4.png';
    }
  }
  ngOnInit(): void {
    this.getPlaces();
  }

}
