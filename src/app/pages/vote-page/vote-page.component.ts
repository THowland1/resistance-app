import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/models/player';
import { first, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Vote } from 'src/enums/vote.enum';
import { SessionService } from 'src/services/session.service';
import { IColumn } from 'src/app/components/player-table/player-table.component';
import { PlayerService } from 'src/services/player.service';
import { GameService } from 'src/services/game.service';
import { MissionCard } from 'src/enums/mission-card';
import { Stage } from 'src/enums/stage.enum';
import { ModalService } from 'src/app/components/modal/modal.service';

@Component({
  selector: 'app-vote-page',
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.scss']
})
export class VotePageComponent implements OnInit {

  constructor(private _playerService: PlayerService,
    private _sessionService: SessionService,
    private _gameService: GameService,
    private _modalService: ModalService) { }
  
  private _currentVotes: Vote[];
  wait: boolean;
  playerName: string;
  players: Player[];

  columns: IColumn = {}

  private destroy$ = new Subject();
  
  ngOnInit() {
    this.playerName = this._sessionService.name;
    this.players = this._sessionService.players;

    this._gameService.get('team')
      .pipe(first())
      .subscribe((teamPick) => this.columns['Team'] = teamPick);

    this._gameService.get('votes')
      .pipe(takeUntil(this.destroy$))
      .subscribe((votes) => {
        this._currentVotes = votes;
        if (!this.wait) {
          this.columns['vote in'] = this._currentVotes.map((vote) => vote !== Vote.notVoted);
        }
      });

    this._gameService.get('wait')
      .pipe(takeUntil(this.destroy$))
      .subscribe((wait) => {
        this.wait = wait;
        if (wait) {
          delete this.columns['vote in'];
          this.columns['vote'] = this._currentVotes.map((vote) => vote === Vote.upvoted);
        }
      })
  }

  onSubmitVoteClick(vote: boolean){
    const playerIndex = this._sessionService.playerIndex;
    if (playerIndex === -1){
      this._modalService.error('Illegal Action',['You cannot vote!','You are not a player in this game!']);
      return;
    }

    const newVote = vote ? Vote.upvoted : Vote.downvoted;
    this._currentVotes[playerIndex] = newVote;

    this._gameService.update('votes',this._currentVotes);
    this._gameService.saveChanges();
  }

  onSeeVotesClick(): void{
    if (!this.check_allPlayersHaveVoted){
      this._modalService.error('Illegal Action',['You cannot see the votes!','Not all votes are in yet!']);
      return;
    }
    this._gameService.update('wait',true);
    this._gameService.saveChanges();
  }

  onMoveOnClick(): void {
    if (!this.check_allPlayersHaveVoted){
      this._modalService.error('Illegal Action',['You cannot move on!','Not all votes are in yet!']);
      return;
    }

    if (this.check_teamApproved === true){
      this._do_startMission();
    } else if (this.check_teamApproved === false) {
      this._do_resetTeamPick();
    } else {
      console.error('Something has gone wrong');
    }    
  }    
  
  get count_votes(): number {
    return this._currentVotes.filter((vote) => vote !== Vote.notVoted).length;
  }
  
  get check_teamApproved(): boolean {
    const upvotes = this._currentVotes.filter((vote) => vote === Vote.upvoted).length;
    const downvotes = this.players.length - upvotes;
    return upvotes > downvotes;
  }

  get check_allPlayersHaveVoted(): boolean {
    return this.count_votes === this.players.length;
  }

  get isLoading(): boolean {
    return [this._currentVotes, this.wait].some((prop) => prop === undefined);
  }
  
  private _do_startMission(): void {
    this._gameService.update('wait',false);
    this._gameService.update('playedCards', new Array(this._playerService.count).fill(MissionCard.none));
    this._gameService.update('stage', Stage.Mission);
    this._gameService.saveChanges();
  }

  private _do_resetTeamPick(): void {
    this._gameService.game$
      .pipe(first())
      .subscribe((game) => {
        game.leader = (game.leader + 1) % this._playerService.count;
        game.noOfDownvotedTeams = game.noOfDownvotedTeams + 1;

        this._gameService.update('wait',false);
        this._gameService.update('leader', game.leader);
        this._gameService.update('votes', new Array(this._playerService.count).fill(Vote.notVoted));
        this._gameService.update('noOfDownvotedTeams', game.noOfDownvotedTeams);
        
        if (this._gameService.check_isGameOver(game)) {
          this._gameService.update('stage', Stage.GameOver);
        } else {
          this._gameService.update('stage', Stage.TeamPick);
        }
        this._gameService.saveChanges();
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
