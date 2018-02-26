import { Component } from '@angular/core';
import { LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';

import { TeamHomePage, TournamentsPage } from './../pages';

import { EliteApiService } from './../../services/services';

@IonicPage()
@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {

  favourites = [
    {
      team: {id: 6182, name: "HC Elite 7th", coach: "Michelotti"},
      tournamentId: "3dd50aaf-6b03-4497-b074-d81703f07ee8",
      tournamentName: "Marche Madness Tournament"
    }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public eliteApi: EliteApiService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamsPage');
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
