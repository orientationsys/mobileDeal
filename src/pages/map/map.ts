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
    var map = Leaflet.map('map').setView([51.505, -0.09], 13);

Leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

Leaflet.marker([53.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
Leaflet.marker([53.4, -0.08]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
var popup = Leaflet.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);
  }
}
