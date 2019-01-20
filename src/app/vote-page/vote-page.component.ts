import { Component, OnInit, Input } from '@angular/core';
import { MissionService } from 'src/services/mission.service';
import { Player } from 'src/models/player';

@Component({
  selector: 'app-vote-page',
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.scss']
})
export class VotePageComponent implements OnInit {

  constructor(private _missionService: MissionService) { }
  
  @Input() playerName: string;
  @Input() players: Player[];
  
  ngOnInit() {
    // TODO Remove this eventually
    console.log(this.players);
    this._missionService.currentVotes()
      .subscribe((votes) => console.log(votes));
  }

  submitVote(vote: boolean){
    this._missionService.submitVote(vote);
  }

}
