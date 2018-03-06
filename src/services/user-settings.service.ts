import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserSettingsService{

  constructor(private storage: Storage){}

  favoriteTeam(team, tournamentId, tournamentName){
    console.log('Setting local Storage');
    let item = {team: team, tournamentId: tournamentId, tournamentName: tournamentName};
    this.storage.set(team.id.toString(), JSON.stringify(item));
  }

  unfavoriteTeam(team){
    console.log('Starting unfavoriteTeam');
    this.storage.remove(team.id.toString());
  }

  isFavoriteTeam(teamId: string): Promise<boolean>{
    return this.storage.get(teamId).then(value => value ? true : false);
  }

  async getAllFavorites(){
    let items = [];

    this.storage.forEach(await function(data){
      if(data !== true){
          items.push(JSON.parse(data));
      }
    })
        
    return items;
  }
}
