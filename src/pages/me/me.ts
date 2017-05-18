import { Component,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Service } from '../../app/service';
import { RestaurantsPage } from '../restaurants/restaurants';
import { PromosDetailPage } from '../promos-detail/promos-detail';
import { SignupPage } from '../signup/signup';
import { ForgotPage } from '../forgot/forgot';
@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage implements OnInit{
    token:any;
    email:any;
    storage:Storage;
    isLogin:any = "100";
    deals:any;
    companies:any;
    loginEmail:any;
    loginPassword:any;
    result:any;
    error:any = false;
    BASE_URL:any;
    emailError:any = false;
    emailFormError:any = false;
    passwordError:any = false;
    flag:any = true;

    url:any = "http://mobiledeals.sooperior.com/customer/checkLogin?";
    loginUrl:any = "http://mobiledeals.sooperior.com/customer/doLogin?type=me&";
    constructor(public navCtrl: NavController,storage: Storage,private service: Service) {
        this.storage = storage;
    }
    ngOnInit(): void {

    }
    checkLogin(){
      this.service.checkLogin(this.url+"token="+this.token+"&email="+this.email)
          .subscribe(
              data => {
                this.isLogin = data.isLogin;
                this.deals = data.deals;
                this.companies = data.companies;
                this.BASE_URL = data.BASE_URL;
              });
    }
    sigIn(){
        let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        this.flag = true;
        if (!this.loginEmail) {
            this.emailError = true;
            this.emailFormError = false;
            this.flag = false;
        } else if(!regExp.test(this.loginEmail))  {
            this.emailFormError = true;
            this.emailError = false;
            this.flag = false;
        } else {
            this.emailError = false;
            this.emailFormError = false;
        }
        if (!this.loginPassword) {
            this.passwordError = true;
            this.flag = false;
        } else {
            this.passwordError = false;
        }
        if (this.flag) {
            this.service.getLogin(this.loginUrl+"email="+this.loginEmail+"&password="+this.loginPassword)
                .subscribe(
                    data => {
                        this.token = data.token;
                        this.result = data.result;
                        this.isLogin = data.result;
                        this.companies = data.companies;
                        this.BASE_URL = data.BASE_URL;
                        this.deals = data.deals;
                        this.checkResult();
                    });
        }

    }
    checkResult(){
        if (this.result) {
            this.email = this.loginEmail;
            this.storage.set('token', this.token);
            this.storage.set('email', this.loginEmail);
        } else {
            this.error = true;
            this.loginEmail = "";
            this.loginPassword = "";
        }
    }
    goRestaurants(id){
        this.navCtrl.push(RestaurantsPage,{id:id,email:this.email,token:this.token});
    }
    getDetailPromos(promos) {
        this.navCtrl.push(PromosDetailPage,{promos:promos,BASE_URL:this.BASE_URL,email:this.email,token:this.token});
    }
    signUp(){
        this.navCtrl.push(SignupPage,{
            callback:this.myCallbackFunction
        });
    }
    myCallbackFunction = (param1, param2, param3) => {
        return new Promise((resolve, reject) => {
            this.isLogin = param1;
            this.email = param2;
            this.token = param3;
            resolve();
        });
    }
    ionViewWillEnter(){
        Promise.all([
            this.storage.get('token'),
            this.storage.get('email')
        ])
            .then(([token, email]) => {
                this.token = token;
                this.email = email;
                this.checkLogin();
            })
    }
    forgot() {
        this.navCtrl.push(ForgotPage);
    }
}
