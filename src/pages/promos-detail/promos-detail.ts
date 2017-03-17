import { Component,OnInit } from '@angular/core';
import { Service } from '../../app/service';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'promos-detail-page',
  templateUrl: 'promos-detail.html'
})
export class PromosDetailPage implements OnInit{
  //参数
  moreDeals:any;
  BASE_URL:any;
  id_deal:any;
  promos:any;
  medias:any;
  //url
  detailUrl:any = 'http://mobiledeals.sooperior.com/deal/detail?id_deal=';
  constructor(private service: Service,public navCtrl: NavController,public navParams: NavParams) {
    this.promos = navParams.get('promos');
    console.log(this.promos);
    this.id_deal = this.promos.id_deal;
    this.BASE_URL = navParams.get('BASE_URL');
  }
  getDetailPromos(){
    this.service.getDetailPromos(this.detailUrl+this.id_deal)
        .subscribe(
            data => {
              this.moreDeals = data.moreDeals;
              this.medias = data.medias;
              console.log(data);
            });
  }
  ngOnInit(){
      this.getDetailPromos();
  }
}
