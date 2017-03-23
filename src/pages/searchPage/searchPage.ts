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
    searchType:any = "search";
    tags:any = [];
    types:any = [];
    sort:any = '';
  constructor(private service: Service,public navCtrl: NavController,public modalCtrl: ModalController,public navParams: NavParams) {
    this.name = navParams.get('name');

    this.searchType = navParams.get('searchType');
    this.tags = navParams.get('tags');
    this.types = navParams.get('types');
    this.sort = navParams.get('sort');
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
    getDealsByFilter():void{
        var url = this.filterUrl;
        this.tags.forEach(function (e) {
            url += "&tags[]="+e;
        })
        this.types.forEach(function (e) {
            url += "&types[]="+e;
        })
        if (this.sort) {
            url += "&sort="+this.sort;
        }
        this.service.getFilterList(url)
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
      if (this.searchType == "filter") {
          this.getDealsByFilter();
      } else {
          this.getDeals();
      }
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
