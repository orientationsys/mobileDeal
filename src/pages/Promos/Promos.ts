import { Component,OnInit } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import { Service } from '../../app/service';
import { PromosDetailPage } from '../promos-detail/promos-detail';
import { PromosPreviewPage } from '../../pages/promos-preview/promos-preview';
import { FilterPage } from '../../pages/filter/filter';
import { seacrhPage } from '../searchPage/searchPage';

@Component({
  selector: 'page-promos',
  templateUrl: 'Promos.html'
})
export class PromosPage implements OnInit{
  selectCategory:any;
  seacrchBoolean:any = false;
  //ajax所拿到的各项值
  url:any = 'http://mobiledeals.sooperior.com/deal/getDealNameBySearch?city=Windsor&name=';
  data:any;
  deals: any;
  baseurl:any;
  open:any;
  mealTime:any;
  distances:any;
  media:any = [];
  BASE_URL:any;
  searchData:any = {};
  constructor(private service: Service,public navCtrl: NavController,public modalCtrl: ModalController) {
  }
  //ajax获取deals
  getDeals():void{
    this.service.getDeals()
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
  categoryFilter(event, category){
    this.selectCategory = category;
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
    actFilter(){
        let filterModal = this.modalCtrl.create(FilterPage);
        filterModal.present();
    }
  //搜索模块
  search(value){
    if(value!=""){
      this.service.getSearch(this.url+value)
        .subscribe(
          data=>{
            this.searchData = data;
            if(this.searchContent == ''){
              this.searchData = '';
            }
            console.log(data);
          }
        )
    }
    if(this.searchContent == ''){
      this.searchData = '';
    }
  }
  //打开搜索框
  openSearchBox(){
    this.seacrchBoolean = true;
  }
  //关闭搜索框
  closeSearchBox(){
    this.seacrchBoolean = false;
  }
  //清空搜索框
  searchContent:any;
  clearAll(){
    this.searchContent = '';
    this.searchData = '';
  }
  //搜索list->detail
  goToSearchDetail(name){
    this.navCtrl.push(seacrhPage,{name:name});
  }
}
