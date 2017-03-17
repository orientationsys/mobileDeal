import { Component,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Service } from '../../app/service';
import { PromosDetailPage } from '../../promos-detail/promos-detail'

@Component({
  selector: 'page-promos',
  templateUrl: 'Promos.html'
})
export class PromosPage implements OnInit{
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
  constructor(private service: Service,public navCtrl: NavController) {
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
    this.service.getDetailPromos(this.detailUrl+promos.id_food)
        .subscribe(
            data => {
              this.selectBlog = data.food;
              this.BASE_URL = data.BASE_URL;
              this.navCtrl.push(PromosDetailPage, {blog: this.selectBlog});
            });
  }


}
