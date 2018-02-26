import { Component } from '@angular/core';
import { LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';

import { TeamsPage } from './../pages';

import { EliteApiService } from './../../services/services';

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  tournaments: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public eliteApi: EliteApiService,
              public loadingController: LoadingController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TournamentsPage');
    let loader = this.loadingController.create({
      content: 'Getting tournaments',
      spinner: 'dots'
    })
    loader.present().then(()=>{
      this.eliteApi.getTournaments()
        .then(data => {
          this.tournaments = data;
          loader.dismiss();
        });
    })
  }

  itemTapped($event, tournament){
    this.navCtrl.push(TeamsPage, tournament);
  }

}
