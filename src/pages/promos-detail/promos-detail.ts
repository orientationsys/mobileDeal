import { Component,OnInit,ViewChild } from '@angular/core';
import { Service } from '../../app/service';
import { NavController, NavParams,ModalController, Content} from 'ionic-angular';
import { PromosPreviewPage } from '../../pages/promos-preview/promos-preview';
declare var window;
@Component({
  selector: 'promos-detail-page',
  templateUrl: 'promos-detail.html'
})
export class PromosDetailPage implements OnInit{
  @ViewChild(Content) content: Content;
  //参数
  moreDeals:any;
  BASE_URL:any;
  id_deal:any;
  promos:any;
  medias:any;
  //url
  detailUrl:any = 'http://mobiledeals.sooperior.com/deal/detail?id_deal=';
  constructor(private service: Service,public navCtrl: NavController,public navParams: NavParams, public modalCtrl: ModalController) {
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
            });
  }
  //callphone
  callphone(phoneNumber){
    window.location= "tel:"+phoneNumber;
  }

  photoDetail(media, name){
    let profileModal = this.modalCtrl.create(PromosPreviewPage, { media: media, name:name , BASE_URL:this.BASE_URL});
    profileModal.present();
  }
  ngOnInit(){
      this.getDetailPromos();
  }
  otherDetail(moreDeal) {
    this.promos = moreDeal;
    this.id_deal = moreDeal.id_deal;
    this.service.getDetailPromos(this.detailUrl+this.id_deal)
        .subscribe(
            data => {
              this.moreDeals = data.moreDeals;
              this.medias = data.medias;
            });
    this.content.scrollToTop();
  }
}
