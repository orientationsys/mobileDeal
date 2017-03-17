import { Component,OnInit } from '@angular/core';
import { Service } from '../../app/service';

@Component({
  selector: 'promos-detail-page',
  templateUrl: 'promos-detail.html'
})
export class PromosDetailPage implements OnInit{

  constructor(private service: Service) {
  }


}
