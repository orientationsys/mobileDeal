import { Component,OnInit } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { Service } from '../../app/service';
import { MediaPreviewPage } from '../../pages/media-preview/media-preview';
/*
  Generated class for the RestaurantMedia page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-restaurant-media',
  templateUrl: 'restaurant-media.html'
})
export class RestaurantMediaPage implements OnInit{
  id_company:any;
  url:any = "http://mobiledeals.sooperior.com/place/getGallery?id_company=";
  company:any = {};
  BASE_URL:any;
  medias:Array<any>;
  mediaDetail:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Service:Service, public modalCtrl: ModalController) {
    this.id_company = navParams.get('id_company');
  }
  ngOnInit(){
    this.Service.getResturantGallery(this.url+this.id_company)
        .subscribe(
            data=>{
              this.company  = data.company;
              this.BASE_URL = data.BASE_URL;
              this.medias = data.medias;
              console.log(data.medias);
            }
        )
  }
    photoDetail(photo, name){
        let profileModal = this.modalCtrl.create(MediaPreviewPage, { photo: photo, name:name , BASE_URL:this.BASE_URL});
        profileModal.present();
    }
}
