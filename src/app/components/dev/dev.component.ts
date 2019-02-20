import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseService } from 'src/services/base.service';
import { NavService } from 'src/services/nav.service';
import { Session } from 'src/models/session';
import { newGame } from 'src/models/game';
import { newPlayer, Player } from 'src/models/player';
import { first } from 'rxjs/operators';
import { Vote } from 'src/enums/vote.enum';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/services/session.service';
import { GameService } from 'src/services/game.service';
import { PlayerService } from 'src/services/player.service';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss']
})
export class DevComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
    private base: BaseService,
    private _navService: NavService,
    private _sessionService: SessionService,
    private _gameService: GameService,
    private _playerService: PlayerService) { }

  ngOnInit() {
    this._route.queryParams.subscribe((params) => { this.devAreaEnabled = params.dev});
  }

  // Hijack Room
  hijackName: string;
  hijackRoomCode: string;

  faCoffee = faCoffee;
  devAreaVisible: boolean = false;
  devAreaEnabled: boolean = false;

  hijackClick(): void{
    this._sessionService.name = this.hijackName;
    this._sessionService.roomCode = this.hijackRoomCode;    
  }

  // Click the coffee
  coffeeClicks: number = 0;
  clickTheCoffee(): void {
    if(!this.devAreaEnabled){
      return;
    }

    this.coffeeClicks++;
    if (this.coffeeClicks > 2){
      this.devAreaVisible = true;
    }
  }

  // Create Room
  createRoomCode: string;
  createNoOfPlayers: number;

  createClick(): void{
    const roomCode = this.createRoomCode;
    const noOfPlayers = this.createNoOfPlayers;

    const playerNames: string[] = ['aaa','bbb','ccc','ddd','eee','fff','ggg','hhh','iii','jjj']
    console.log(`Creating room ${roomCode} with ${noOfPlayers} players`)
    this.base.addGame(roomCode,newGame())

    for (let index = 0; index < noOfPlayers; index++) {
      const name = playerNames[index];
      this.base.addDoc('player',newPlayer(name), name, roomCode)
    }
  }

  // Reset room
  resetRoomCode: string;

  resetClick(): void {
    const roomCode = this.resetRoomCode;

    this.base.addGame(roomCode,newGame());
  }

  // Vote entire team up
  upvoteRoomCode: string;

  upOrDownvoteClick(upOrDown: boolean): void {
    const roomCode = this.upvoteRoomCode;
    const vote = upOrDown ? Vote.upvoted : Vote.downvoted;
    this._sessionService.roomCode = roomCode;

    this._playerService.count$.toPromise()
      .then((count) => {
        this._gameService.update('votes', new Array(count).fill(vote));
        this._gameService.saveChanges();
      })
  }
}
