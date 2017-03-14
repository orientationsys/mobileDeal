import { Component ,OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Service } from '../../app/service';

@Component({
  selector: 'page-Insights',
  templateUrl: 'Insights.html'
})
export class InsightsPage implements OnInit{
  blogs:any;
  BASE_URL:any;
  url:any = "http://mobiledeals.sooperior.com/food/listing";
  constructor(private service: Service,public navCtrl: NavController) {

  }
  getBlogs(){
    this.service.getBlogs(this.url)
        .subscribe(
            blogs => {
              this.blogs = blogs;
            });
  }
  ngOnInit(): void {
    this.getBlogs();
  }
}
