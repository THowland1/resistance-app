import { Component, OnInit, Input } from '@angular/core';
import { MissionService } from 'src/services/mission.service';
import { Player } from 'src/models/player';
import { bind } from 'src/functions';
import { first, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-vote-page',
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.scss']
})
export class VotePageComponent implements OnInit {

  constructor(private _missionService: MissionService) { }
  
  @Input() playerName: string;
  @Input() players: Player[];

  teamPick: Player[];
  currentVotes: boolean[];
  wait: boolean;

  private destroy$ = new Subject();
  
  ngOnInit() {
    // TODO Remove this eventually
    console.log(this.players);
    this._missionService.currentVotes()
      .pipe(takeUntil(this.destroy$))
      .subscribe(bind(this,'currentVotes'));
    
    this._missionService.getTeamPick()
      .pipe(
        first(),
        map((bools) => this.players.filter((_,index) => bools[index])))
      .subscribe(bind(this,'teamPick'));

    this._missionService.wait.subscribe(bind(this,'wait'))
  }

  submitVote(vote: boolean){
    if (this.playerIndex === -1){
      console.error('You are not a player in this game');
      return;
    }
    this._missionService.submitVote(vote,this.playerIndex);
  }

  seeVotes(): void{
    if(!this.allVotesIn){
      console.error('Not all votes are in yet');
      return;
    }
    alert(this.hasItGoneAhead ? 'Team approved' : 'Team denied');
    this._missionService.updateWait(true);
  }

  moveOn(): void{
    if(!this.allVotesIn){
      console.error('The votes aren\'t all in')
      return;
    }

    this._missionService.updateWait(false);
    this._missionService.moveOn(this.hasItGoneAhead);
  }

  get hasItGoneAhead(): boolean {
    const upvotes = this.currentVotes.filter((vote) => vote).length;
    const downvotes = this.players.length - upvotes;
    return upvotes > downvotes;
  }

  get playerIndex(): number {
    return this.players.map((player) => player.name).indexOf(this.playerName);
  }

  get noOfVotesIn(): number {
    return this.currentVotes.filter((vote) => vote !== null).length;
  }

  get allVotesIn(): boolean {
    return this.noOfVotesIn === this.players.length;
  }

  get isLoading(): boolean {
    return [this.currentVotes, this.teamPick, this.wait].some((prop) => prop === undefined);
  }

  get yourVote(): boolean {
    return this.currentVotes[this.playerIndex];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
