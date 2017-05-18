import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Service } from '../../app/service';
/*
  Generated class for the Forgot page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html'
})
export class ForgotPage implements OnInit{
  email:any;
  emailFormError:any = false;
  emailError:any = false;
  flag:any = true;
  result:any = false;
  errorMsg:any;
  url:any = "http://mobiledeals.sooperior.com/customer/forgetPassword?email=";
  constructor(public navCtrl: NavController, public navParams: NavParams,private service: Service) {}
  ngOnInit(): void {

  }
  send() {
    let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    this.flag = true;
    if (!this.email) {
      this.emailError = true;
      this.emailFormError = false;
      this.flag = false;
    } else if(!regExp.test(this.email))  {
      this.emailFormError = true;
      this.emailError = false;
      this.flag = false;
    } else {
      this.emailError = false;
      this.emailFormError = false;
    }
    if (this.flag) {
      this.service.forgotPassword(this.url+this.email)
          .subscribe(
              data => {
                this.result = data.result;
                this.errorMsg = data.errorMsg;
              });
    }
  }
}
