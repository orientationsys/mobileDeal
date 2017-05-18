import { Component,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Service } from '../../app/service';
import { PromosDetailPage } from '../promos-detail/promos-detail'


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage implements OnInit{
  items;
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
  //ajax所拿到的各项值
  data:any;
  deals: any;
  baseurl:any;
  open:any;
  mealTime:any;
  distances:any;
  media:any;
  BASE_URL:any;
  getCityUrl = 'http://mobiledeals.sooperior.com/searchDeal?city=Windsor&address=3160 wildwood&state=Ontario&start=';  // URL to web api
  constructor(private service: Service,public navCtrl: NavController) {
    this.initializeItems();
  }
  //ajax获取deals
  getDeals():void{
    this.service.getDeals(this.getCityUrl)
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
    this.getDeals();
  }
  getDetailPromos(promos) {
    this.navCtrl.push(PromosDetailPage,{promos:promos,BASE_URL:this.BASE_URL});
  }
  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota',
      'Buenos Aires',
      'Cairo',
      'Dhaka',
      'Edinburgh',
      'Geneva',
      'Genoa',
      'Glasglow',
      'Hanoi',
      'Hong Kong',
      'Islamabad',
      'Istanbul',
      'Jakarta',
      'Kiel',
      'Kyoto',
      'Le Havre',
      'Lebanon',
      'Lhasa',
      'Lima',
      'London',
      'Los Angeles',
      'Madrid',
      'Manila',
      'New York',
      'Olympia',
      'Oslo',
      'Panama City',
      'Peking',
      'Philadelphia',
      'San Francisco',
      'Seoul',
      'Taipeh',
      'Tel Aviv',
      'Tokio',
      'Uelzen',
      'Washington'
    ];
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
