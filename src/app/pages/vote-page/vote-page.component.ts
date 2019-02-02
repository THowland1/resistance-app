import { Component, OnInit, Input } from '@angular/core';
import { MissionService } from 'src/services/mission.service';
import { Player } from 'src/models/player';
import { bind } from 'src/functions';
import { first, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Vote } from 'src/enums/vote.enum';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-vote-page',
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.scss']
})
export class VotePageComponent implements OnInit {

  constructor(private _missionService: MissionService,
    private _sessionService: SessionService) { }
  
  teamPick: boolean[];
  currentVotes: Vote[];
  wait: boolean;
  playerName: string;
  players: Player[];

  private destroy$ = new Subject();
  
  ngOnInit() {
    this.playerName = this._sessionService.name;
    this.players = this._sessionService.players;
    // TODO Remove this eventually
    console.log(this.players);
    this._missionService.currentVotes()
      .pipe(takeUntil(this.destroy$))
      .subscribe(bind(this,'currentVotes'));
    
    this._missionService.getTeamPick()
      .pipe(
        first())
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
  
  votePipe(vote: Vote): string {
    switch (vote) {
      case Vote.notVoted:
        return 'not voted!';
        case Vote.upvoted:
        return 'voted it up!';
        case Vote.downvoted:
        return 'voted it down!';
        default:
        return 'error';
      }
    }
    
  
  tableVote(index: number): string {
    if(!this.wait && this.currentVotes[index] !== Vote.notVoted){
      return '?';
    } else if(this.currentVotes[index] === Vote.notVoted){
      return '';
    } else {
      return this.votePipe(this.currentVotes[index]);
    }

  }
  get hasItGoneAhead(): boolean {
    const upvotes = this.currentVotes.filter((vote) => vote === Vote.upvoted).length;
    const downvotes = this.players.length - upvotes;
    return upvotes > downvotes;
  }

  get playerIndex(): number {
    return this.players.map((player) => player.name).indexOf(this.playerName);
  }

  get noOfVotesIn(): number {
    return this.currentVotes.filter((vote) => vote !== Vote.notVoted).length;
  }

  get allVotesIn(): boolean {
    return this.noOfVotesIn === this.players.length;
  }

  get isLoading(): boolean {
    return [this.currentVotes, this.teamPick, this.wait].some((prop) => prop === undefined);
  }


  get yourVote(): boolean {
    switch (this.currentVotes[this.playerIndex]) {
      case Vote.notVoted:
        return null;
      case Vote.upvoted:
        return true;
      case Vote.downvoted:
        return false;
      default:
        console.error('An error with the votes has occurred')
        return null;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
