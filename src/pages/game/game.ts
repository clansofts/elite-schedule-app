import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EliteApiService } from './../../services/services';

import { TeamHomePage } from './../pages'

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  public game: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public eliteApi: EliteApiService) {
      this.game = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');

    this.game.gameTime = Date.parse(this.game.time);
  }

  teamTapped(teamId){
    let tourneyData = this.eliteApi.getCurrentTourney();
    let team = tourneyData.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }

  goToDirections(){

  }

  goToMap(){

  }

  isWinner(score1, score2){
    return Number(score1) > Number(score2) ? 'primary' : 'danger';
  }

}
