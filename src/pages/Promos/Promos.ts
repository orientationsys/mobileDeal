import { Component,OnInit } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import { Service } from '../../app/service';
import { PromosDetailPage } from '../promos-detail/promos-detail';
import { PromosPreviewPage } from '../../pages/promos-preview/promos-preview';
import { FilterPage } from '../../pages/filter/filter';

@Component({
  selector: 'page-promos',
  templateUrl: 'Promos.html'
})
export class PromosPage implements OnInit{

  //ajax所拿到的各项值
  data:any;
  deals: any;
  baseurl:any;
  open:any;
  mealTime:any;
  distances:any;
  media:any = [];
  BASE_URL:any;
  selectCategory:any;
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
  getDetailPromos(promos) {
    this.navCtrl.push(PromosDetailPage,{promos:promos,BASE_URL:this.BASE_URL});
  }
  photoDetail(photo, name){
    let profileModal = this.modalCtrl.create(PromosPreviewPage, { photo: photo, name:name , BASE_URL:this.BASE_URL});
    profileModal.present();
  }
    actFilter(){
        let filterModal = this.modalCtrl.create(FilterPage);
        filterModal.present();
    }
}
