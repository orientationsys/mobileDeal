import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import {DomSanitizer} from "@angular/platform-browser";


/*
  Generated class for the MediaPreview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-media-preview',
  templateUrl: 'media-preview.html'
})
export class MediaPreviewPage {
  name:any;
  photo:any = {};
  BASE_URL:any;
  dangerousVideoUrl:any;
  videoUrl:any;
  num: any;
  index: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,private sanitizer: DomSanitizer) {
    this.name = navParams.get('name');
    this.photo = navParams.get('photo');
    this.BASE_URL = navParams.get('BASE_URL');
    this.num = navParams.get('length');
    this.index = navParams.get('index')+1;
    if (this.photo.type == 2) {
      this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + this.photo.media;
      this.videoUrl =
          this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
    }
  }

  closeModel(){
    this.viewCtrl.dismiss();
  }

}
