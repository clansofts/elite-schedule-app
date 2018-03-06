import { Component } from '@angular/core';
import { LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';

import { TeamHomePage, TournamentsPage } from './../pages';

import { EliteApiService, UserSettingsService } from './../../services/services';

@IonicPage()
@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {

  favourites = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public eliteApi: EliteApiService,
    public userSettings: UserSettingsService) {
      this.userSettings.getAllFavorites().then(res => {
        this.favourites = res;
      });      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamsPage');
  }

  ionViewDidEnter(){
  }

  favouriteTapped($event, favorite){
    let loader = this.loadingController.create({
      content: 'Getting data',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId)
        .subscribe(t => this.navCtrl.push(TeamHomePage, favorite.team));
  }

  goToTournaments(){
    this.navCtrl.push(TournamentsPage)
  }

}
