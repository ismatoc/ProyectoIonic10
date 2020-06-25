import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';

import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

declare var google;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  argumento = null;
  argumento2 = null;
  public dato;
  public dato2;

  public origen;
  public origen2;

  map: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  // parque simon bolivar
  
  // destino
  //destination = { lat: 4.676802158355713, lng: -74.04825592041016 };
  
  
  //destination = { lat: 15.212908, lng: -90.217297 };


  constructor(
    private activatedRoute: ActivatedRoute, private geolocation: Geolocation
  ) { }

  ngOnInit() {

    this.dato = parseFloat(this.activatedRoute.snapshot.paramMap.get('id')).toFixed(6);
    this.dato2 = parseFloat(this.activatedRoute.snapshot.paramMap.get('id2')).toFixed(6);
    this.geolocationNative();
    this.loadMap();
    
    

  
  }

  async geolocationNative(){
    this.geolocation.getCurrentPosition().then((geposition: Geoposition) => {
      
      this.origen = geposition.coords.latitude;
      this.origen2 = geposition.coords.longitude;
     });
  }
  
  //origin = { lat: 15.280462, lng: -90.080013 };
  origin = { lat: Number(this.origen), lng: Number(this.origen2) };
  destination = { lat: Number(this.dato), lng: Number(this.dato2) };//{ lat: 15.212908, lng: -90.217297 };

  async loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    const indicatorsEle: HTMLElement = document.getElementById('indicators');
    // create LatLng object
    //const myLatLng = {lat: 4.658383846282959, lng: -74.09394073486328};
    const myLatLng = {lat: 15.646647, lng: -70.510762};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: { lat: Number(this.origen), lng: Number(this.origen2) },
      zoom: 10
    });

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(indicatorsEle);
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      
      mapEle.classList.add('show-map');
      this.calculateRoute();
      
    });
  }

  private calculateRoute() {
    this.directionsService.route({
      origin: { lat: Number(this.origen), lng: Number(this.origen2) },
      //destination: this.destination,
      destination: { lat: Number(this.dato), lng: Number(this.dato2) },
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
    }

}
