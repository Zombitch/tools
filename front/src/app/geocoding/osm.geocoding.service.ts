import { Injectable } from '@angular/core';
import { GeocodingService } from './geocoding.service';
import { HttpClient } from '@angular/common/http';
import { GeocodeData } from './geocode-data.model';

@Injectable({
  providedIn: 'root'
})
export class OsmGeocodingService extends GeocodingService{

  constructor(protected override http: HttpClient) {
    super(http);
    this.baseURL = "https://nominatim.openstreetmap.org";
    this.waitBeforeNextRequest = 1050;
  }

  public override processGeocoding(address: string): void {
    let geocodedData = undefined;
    address = address.replace(" ", "+");
    this.http.get(this.baseURL+"/search?q="+address+"&format=json").subscribe((value: any) => {
      const osmData = value[0];
      geocodedData = {name: osmData.display_name, lat: osmData.lat, long: osmData.lon}
      this.result.push(geocodedData);
      this._geocodeEvent.next(geocodedData);
    });
  }
}
