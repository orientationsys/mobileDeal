import { Component ,OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Service } from '../../app/service';
import { InsightsDetailPage } from '../../pages/insights-detail/insights-detail';

@Component({
  selector: 'page-Insights',
  templateUrl: 'Insights.html'
})
export class InsightsPage implements OnInit{
  blogs:any;
  BASE_URL:any;
  selectBlog:any;
  url:any = "http://mobiledeals.sooperior.com/food/listing?city=Windsor";
  detailUrl:any = "http://mobiledeals.sooperior.com/food/detail?id_food=";
  constructor(private service: Service,public navCtrl: NavController) {

  }
  getDetailBlogs(blog){
    this.service.getDetailBlog(this.detailUrl+blog.id_food)
        .subscribe(
            data => {
              this.selectBlog = data.food;
              this.BASE_URL = data.BASE_URL;
              this.navCtrl.push(InsightsDetailPage, {blog: this.selectBlog});
            });
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
