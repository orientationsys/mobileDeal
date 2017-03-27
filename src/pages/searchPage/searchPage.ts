import { Component,OnInit } from '@angular/core';
import { NavController,ModalController,NavParams } from 'ionic-angular';
import { Service } from '../../app/service';
import { PromosDetailPage } from '../promos-detail/promos-detail';
import { PromosPreviewPage } from '../../pages/promos-preview/promos-preview';

@Component({
  selector: 'page-seacrhPage',
  templateUrl: 'searchPage.html'
})
export class seacrhPage implements OnInit{
  //ajax所拿到的各项值
  name:any;
  url:any = 'http://mobiledeals.sooperior.com/deal/searchByName?city=Windsor&start=0&address=3160%20wildwood&state=Ontario&name=';
  filterUrl:any = 'http://mobiledeals.sooperior.com/deal/searchByFilter?city=Windsor&start=0&address=3160%20wildwood&state=Ontario';
  data:any;
  deals: any;
  baseurl:any;
  open:any;
  mealTime:any;
  distances:any;
  media:any = [];
  BASE_URL:any;
  searchData:any = {};
    //data from filter page
    tags:any = [];
    types:any = [];
    sort:any = '';
  constructor(private service: Service,public navCtrl: NavController,public modalCtrl: ModalController,public navParams: NavParams) {
    this.name = navParams.get('name');

  }
  //ajax获取deals
  getDeals():void{
    this.service.getSearchList(this.url+this.name)
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
      this.getDeals();
  }
  //跳转到detail页面
  getDetailPromos(promos) {
    this.navCtrl.push(PromosDetailPage,{promos:promos,BASE_URL:this.BASE_URL});
  }
  //查看图片大图
  photoDetail(photo, name){
    let profileModal = this.modalCtrl.create(PromosPreviewPage, { photo: photo, name:name , BASE_URL:this.BASE_URL});
    profileModal.present();
  }
}
