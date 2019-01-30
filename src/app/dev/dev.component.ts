import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseService } from 'src/services/base.service';
import { LoginService } from 'src/services/login.service';
import { RoleService } from 'src/services/role.service';
import { NavService } from 'src/services/nav.service';
import { Session } from 'src/models/session';
import { newGame } from 'src/models/game';
import { newPlayer, Player } from 'src/models/player';
import { first } from 'rxjs/operators';
import { Vote } from 'src/enums/vote.enum';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss']
})
export class DevComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
    private base: BaseService,
    private _navService: NavService,
    private _loginService: LoginService,
    private _roleService: RoleService) { }

  @Output() joinedServer = new EventEmitter<Session>();
  @Output() playersAssigned = new EventEmitter<Player[]>();

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
    const name = this.hijackName;
    const roomCode = this.hijackRoomCode;
    this.joinedServer.emit({name,roomCode});
    this.base.getCollection<Player>('player').pipe(first()).subscribe((players) => {
      this.playersAssigned.emit(players);
    })
    
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

    this.base.getCollectionCount('player')
      .subscribe((count) => {
        this.base.updateGameProperty('votes', new Array(count).fill(vote));
      })
  }
}
