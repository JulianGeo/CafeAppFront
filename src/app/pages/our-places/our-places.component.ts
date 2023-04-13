import { Component } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { icon, Marker } from 'leaflet';
import { Inject, Input, OnInit } from '@angular/core';

export const DEFAULT_LAT = 6.21382;
export const DEFAULT_LON =  -75.56086;
export const TITULO = 'Sofkafe';
//const iconRetinaUrl = 'assets/marker-icon-2x.png';
//const iconUrl = 'assets/marker-icon.png';
//const shadowUrl = 'assets/marker-shadow.png';
const iconRetinaUrl = '../../assets/map-pin-svgrepo-com.svg';
const iconUrl = '../../assets/map-pin-svgrepo-com.svg';
const shadowUrl = '../../assets/map-pin-svgrepo-com.svg';


@Component({
  selector: 'app-our-places',
  templateUrl: './our-places.component.html',
  styleUrls: ['./our-places.component.scss']
})
export class OurPlacesComponent  implements OnInit {

  private map:any;
  @Input() lat: number = DEFAULT_LAT;
  @Input() lon: number = DEFAULT_LON;
  @Input() titulo: string = TITULO ;

  constructor() {
  }

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
      //configuración del mapa
      this.map = L.map('map', {
        center: [this.lat, this.lon],
        attributionControl: false,
        zoom: 14
      });

      //iconos personalizados
      var iconDefault = L.icon({
        iconRetinaUrl,
        iconUrl,
        //shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });
     L.Marker.prototype.options.icon = iconDefault;

      //titulo
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://1938.com.es">Web Inteligencia Artificial</a>'
      });

      //marca con pop up
/*       const lon = this.lon + 0.009;
      const lat = this.lat + 0.009;
      const marker = L.marker([lat + 0.005, lon + 0.005]).bindPopup(this.titulo);
      marker.addTo(this.map); */

      //marca forma de circulo
/*       const mark = L.circleMarker([this.lat, this.lon]).addTo(this.map);
      mark.addTo(this.map); */


    //ruta
    L.Routing.control({
      router: L.Routing.osrmv1({
        serviceUrl: `https://router.project-osrm.org/route/v1/`
      }),
      showAlternatives: true,
      fitSelectedRoutes: false,
      show: false,
      routeWhileDragging: true,
      waypoints: [
        L.latLng(this.lat, this.lon),
        /* L.latLng(lat, lon) */
      ]
    }).addTo(this.map);
      tiles.addTo(this.map);
    }

}
