import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseService } from 'src/services/base.service';
import { LoginService } from 'src/services/login.service';
import { RoleService } from 'src/services/role.service';
import { NavService } from 'src/services/nav.service';
import { Session } from 'src/models/session';
import { newGame } from 'src/models/game';
import { newPlayer } from 'src/models/player';

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

  ngOnInit() {
  }

  // Hijack Room
  hijackName: string;
  hijackRoomCode: string;

  hijackClick(): void{
    const name = this.hijackName;
    const roomCode = this.hijackRoomCode;
    this.joinedServer.emit({name,roomCode});
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
      this.base.addPlayer(roomCode,newPlayer(name))
    }
  }

  // Reset room
  resetRoomCode: string;

  resetClick(): void {
    const roomCode = this.resetRoomCode;

    this.base.addGame(roomCode,newGame());
  }
}