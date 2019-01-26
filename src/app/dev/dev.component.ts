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

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss']
})
export class DevComponent implements OnInit {

  constructor(private base: BaseService,
    private _navService: NavService,
    private _loginService: LoginService,
    private _roleService: RoleService) { }

  @Output() joinedServer = new EventEmitter<Session>();
  @Output() playersAssigned = new EventEmitter<Player[]>();

  ngOnInit() {
  }

  // Hijack Room
  hijackName: string;
  hijackRoomCode: string;

  hijackClick(): void{
    const name = this.hijackName;
    const roomCode = this.hijackRoomCode;
    this.joinedServer.emit({name,roomCode});
    this.base.getCollection<Player>('player').pipe(first()).subscribe((players) => {
      this.playersAssigned.emit(players);
    })
    
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

  upvoteClick(): void {
    const roomCode = this.upvoteRoomCode;
    this.base.getCollectionCount('player')
      .subscribe((count) => {
        this.base.updateGameProperty('votes', new Array(count).fill(Vote.upvoted));
      })
  }
}
