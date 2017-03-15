import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

import * as Leaflet from 'leaflet';



@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage implements OnInit{

  constructor(public navCtrl: NavController) {

  }
  ngOnInit(): void {
    this.drawMap();
  }
  drawMap(): void {
    let map = Leaflet.map('max');
    Leaflet.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGF0cmlja3IiLCJhIjoiY2l2aW9lcXlvMDFqdTJvbGI2eXUwc2VjYSJ9.trTzsdDXD2lMJpTfCVsVuA', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      container: 'max',
      center: [-122.420679, 37.772537],
    }).addTo(map);

    //web location
    map.locate({ setView: true});
  }
}
