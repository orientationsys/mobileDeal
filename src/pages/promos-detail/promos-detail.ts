import { Component,OnInit,ViewChild } from '@angular/core';
import { Service } from '../../app/service';
import { NavController, NavParams,ModalController, Content} from 'ionic-angular';
import { PromosPreviewPage } from '../../pages/promos-preview/promos-preview';
import { LoginPage } from '../../pages/login/login'

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
  likeFlag:any;
  token:any;
  storage:any;
  email:any;
  isLogin:any;
  favFlag:any;
  //url
  detailUrl:any = 'http://mobiledeals.sooperior.com/deal/detail?id_deal=';
  likeDetailUrl:any = 'http://mobiledeals.sooperior.com/deal/likeDeal?id_deal=';
  favDealUrl:any = 'http://mobiledeals.sooperior.com/deal/favDeal?id_deal=';
  constructor(private service: Service,public navCtrl: NavController,public navParams: NavParams, public modalCtrl: ModalController) {
    this.promos = navParams.get('promos');
    this.id_deal = this.promos.id_deal;
    this.BASE_URL = navParams.get('BASE_URL');
    this.token = navParams.get('token');
    this.email = navParams.get('email');
  }
  getDetailPromos(){
    this.service.getDetailPromos(this.detailUrl+this.id_deal+"&token="+this.token+"&email="+this.email)
        .subscribe(
            data => {
              this.moreDeals = data.moreDeals;
              this.medias = data.medias;
              this.likeFlag = data.likeFlag;
              this.isLogin = data.isLogin;
              this.favFlag = data.favFlag;
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
  likeDeal(){
    this.service.likeDetailPromos(this.likeDetailUrl+this.id_deal)
        .subscribe(
            data => {
              this.likeFlag = data.likeFlag;
            });
  }
  favDeal(){
    this.service.favPromos(this.favDealUrl+this.id_deal+"&email="+this.email+"&token="+this.token)
        .subscribe(
            data => {
              this.favFlag = data.favFlag;
            });
  }
  goLogin(){
    this.navCtrl.push(LoginPage,{
      callback:this.myCallbackFunction, id_deal:this.id_deal,type:"deal"
    });
  }
  myCallbackFunction = (param1, param2, param3,param4) => {
    return new Promise((resolve, reject) => {
      this.isLogin = param1;
      this.favFlag = param2;
      this.email = param3;
      this.token = param4;
      resolve();
    });
  }
}
