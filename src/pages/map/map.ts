import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { EliteApiService } from './../../services/services';

declare var window: any;
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  public map: any = {};

  constructor(public eliteApi: EliteApiService, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    let games = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    let location = tourneyData.locations[games.locationId];

    this.map = {
      lat: location.latitude,
      lng: location.longitude,
      zoom: 12,
      markerLabel: games.location
    }
  }

  goToDirections(){
      window.location = `geo:${this.map.lat},${this.map.lng};u=35`;
  }

}
