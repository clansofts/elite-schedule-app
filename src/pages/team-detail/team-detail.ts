import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import * as _ from 'lodash';
import * as moment from 'moment';

import { EliteApiService } from './../../services/services';
import { GamePage } from './../game/game';

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  allGames: any[];
  dateFilter: string;
  games: any[];
  isFollowing: boolean = false;
  teamStanding: any;
  team: any;
  private tourneyData: any;
  useDateFilter = false;

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public eliteApi: EliteApiService,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController) {
    this.team = this.navParams.data;
    this.tourneyData = this.eliteApi.getCurrentTourney();
    this.teamStanding = _.find(this.tourneyData.standings, {'teamId' : this.team.id});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamDetailPage');

    this.games = _.chain(this.tourneyData.games)
                  .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
                  .map(g => {
                    let isTeam1 = (g.team1Id === this.team.id);
                    let opponentName = isTeam1 ? g.team2 : g.team1;
                    let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                    return {
                      gameId: g.id,
                      opponent: opponentName,
                      time: Date.parse(g.time),
                      location: g.location,
                      locationUrl: g.locationUrl,
                      scoreDisplay: scoreDisplay,
                      homeAway: (isTeam1 ? "vs." : "at")
                    };
                  })
                  .value();

      this.allGames = this.games;
      this.teamStanding = _.find(this.tourneyData.standings, {'teamId': this.team.id});
  }

  getScoreDisplay(isTeam1, team1Score, team2Score){
    if(team1Score && team2Score){
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score: team1Score);
      var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" + opponentScore;
    } else{
      return "";
    }
  }

  gameClicked($event, game){
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

  getScoreWorL(game){
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }

  getScoreDisplayBadgeColor(game){
    return game.scoreDisplay.indexOf('W:') === 0 ? 'primary' : 'danger';
  }

  dateChanged(){
    if(this.useDateFilter){
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    }else{
      this.games = this.allGames;
    }
  }

  toggleFollow(){
    if(this.isFollowing){
      let confirm = this.alertCtrl.create({
        title: 'Unfollow?',
        message: 'Are your sure you want to unfollow?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;

              let toast = this.toastCtrl.create({
                message: 'You have unfollowed the team',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
            }
          },
          {text: 'No'}
        ]
      });
      confirm.present();
    } else {
      this.isFollowing = true;
    }
  }
}
