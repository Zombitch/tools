import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeocodeData } from './geocode-data.model';
import { Observable, Subject } from 'rxjs';


export enum GeocodingStatus{
  Started,
  InProgress,
  Stopped,
  Completed
}

export class GeocodingService {

  protected baseURL: string = "";
  protected waitBeforeNextRequest = 1000;

  private _status: GeocodingStatus = GeocodingStatus.Stopped;
  public get status(): GeocodingStatus { return this._status; }
  public set status(value: GeocodingStatus) { this._status = value; }

  private _addresses: string[] = [];
  public get addresses(): string[] {return this._addresses;}
  public set addresses(value: string[]) {this._addresses = value;}

  private _currentGeocodingIndex: number = -1;
  public get currentGeocodingIndex(): number {return this._currentGeocodingIndex; }
  public set currentGeocodingIndex(value: number) { this._currentGeocodingIndex = value; }

  private _result: GeocodeData[] = [];
  public get result(): GeocodeData[] { return this._result; }
  public set result(value: GeocodeData[]) { this._result = value; }

  protected _geocodeEvent: Subject<GeocodeData> = new Subject<GeocodeData>();

  protected _geocodeEvent$: Observable<GeocodeData>;
  public get geocodeEvent$(): Observable<GeocodeData> { return this._geocodeEvent$; }
  public set geocodeEvent$(value: Observable<GeocodeData>) { this._geocodeEvent$ = value; }

  constructor(protected http: HttpClient) {
    this._geocodeEvent$ = this._geocodeEvent.asObservable();
  }

  public prepareGeocode(): void{}

  public async geocode(addresses: string[]): Promise<void>{
    this._addresses = addresses;
    this._status = GeocodingStatus.InProgress;
    this.prepareGeocode();

    for(const address of this._addresses){
      this._currentGeocodingIndex++;
      await this.waitTime();
      this.processGeocoding(address);
    };

    this.reset(GeocodingStatus.Completed);
  }

  public processGeocoding(address: string): void{}

  protected reset(status : GeocodingStatus = GeocodingStatus.Stopped){
    this._status = status;
    this._currentGeocodingIndex = -1;
    this._addresses = [];
    this._result = [];
  }

  protected waitTime(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.waitBeforeNextRequest));
  }

  public getProgress(): number{
    return (this._currentGeocodingIndex)/this._addresses.length * 100;
  }
}
