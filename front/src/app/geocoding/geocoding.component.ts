import { AfterViewInit, Component } from '@angular/core';
import {OsmGeocodingService} from './osm.geocoding.service'
import {GeocodingStatus} from './geocoding.service'
import * as L from 'leaflet';
import { GeocodeData } from './geocode-data.model';

@Component({
  selector: 'app-geocoding',
  templateUrl: './geocoding.component.html',
  styleUrls: ['./geocoding.component.scss']
})
export class GeocodingComponent implements AfterViewInit {
  private map: any;
  private addressesText: string = "";

  get isGeocodingRunning() : boolean{
    return [GeocodingStatus.Started, GeocodingStatus.InProgress].includes(this.osm.status);
  }

  get progress(): number{
    return this.osm.getProgress();
  }

  constructor(protected osm: OsmGeocodingService){

  }

  ngOnInit(): void{
    const icon = {
      icon: L.icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 0 ],
        iconUrl: 'marker-icon.png',
        shadowUrl: 'marker-icon.png'
      })
    };

    this.osm.geocodeEvent$.subscribe((data: GeocodeData) => {
      L.marker([data.lat, data.long], icon).addTo(this.map).bindPopup(data.name);
    })
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    
    this.map = L.map('map').setView([46.9, 3.3], 5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(this.map);
  }

  public startGeocoding(): void{
    this.osm.geocode(this.addressesText.split("\n"))
  }

  public onInputChange(event: Event): void {
    const inputElement = event.target as HTMLTextAreaElement;
    this.addressesText = inputElement.value;
  }
}
