import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from 'src/models/player';
import { Team } from 'src/enums/team.enum';
import { Role } from 'src/enums/role.enum';
import { ModalService } from '../modal/modal.service';
import { PlayerService } from 'src/services/player.service';
import { first, takeUntil } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { PlayerTableService } from './player-table.service';
import { GameService } from 'src/services/game.service';
import { Vote } from 'src/enums/vote.enum';
import { MissionCard } from 'src/enums/mission-card';
import { GameType } from 'src/enums/game-type';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})
export class PlayerTableComponent implements OnInit, TableMethods, ColumnMethods, ITable {

  constructor(
    private _playerService: PlayerService,
    private _gameService: GameService,
    private _modalService: ModalService,
    private _tableService: PlayerTableService) { }
  

  players: Player[];
  gameType: GameType;
  isTableVisible: boolean = false;
  isInitialised: boolean = false;
  private destroy$ = new Subject();

  // Table data
  team: IColumn = {
    heading: 'Team',
    data: [],
    readonly: true,
    display: true
  };
  hasVoted: IColumn = {
    heading: 'Voted?',
    data: [],
    readonly: true,
    display: false
  };
  vote: IColumn = {
    heading: 'Vote',
    data: [],
    readonly: true,
    display: false
  };
  hasPlayed: IColumn = {
    heading: 'Played?',
    data: [],
    readonly: true,
    display: false
  };
  investigator: IColumn = {
    heading: 'Investigator',
    data: [],
    readonly: true,
    display: false
  };  

  get columns(): IColumn[] {
    return [
      this.team,
      this.investigator,
      this.hasVoted,
      this.vote,
      this.hasPlayed
    ].filter((column) => column.display === true);
  }

  onColChange(): void {
    this._gameService.update('team',this.team.data);

    if (this.gameType === GameType.hunter) {
      this._gameService.update('investigator',this.investigator.data);
    }

    this._gameService.saveChanges();
  }

  // Table commands
  setVisibility(value: any): void {
    if (typeof(value) !== 'boolean'){
      this._modalService.error('Internal Error','Table visibility cannot be set','A non-bool was passed to the visibility function')
    }
    this.isTableVisible = value;
  }

  onInit(value: any): void {
    if(this.isInitialised) {
      return;
    }
    this.gameType = this._gameService.get('gameType');
    this._bind_players();
    this._bind_team();
    this._bind_votes();
    this._bind_playedCards();

    if (this.gameType === GameType.hunter) {
      this._bind_investigator();
    }

    this.isInitialised = true;
  }

  // Column commands
  setColumnVisibility(column: keyof ITable, value: boolean): void {
    this[column].display = value;
  }

  setColumnReadonly(column: keyof ITable, value: boolean): void {
    this[column].readonly = value;
  }

  // Regular stuff
  ngOnInit(): void {
    this._bind_messageBus();
  }

  onDestroy(): void {
    this.destroy$.complete();
  }

  private _bind_messageBus(): void {
    this._tableService.messageBus.tableCommands$
      .subscribe((command) => {
        const method = command.method;
        const value = command.data;

        this[method](value);
      });

    this._tableService.messageBus.columnCommands$
      .subscribe((command) => {
        const method = command.method;
        const target = command.target;
        const data = command.data;

        this[method](target, data);
      });
  }

  private _bind_players(): void {
    this._playerService.players$
      .pipe(first())
      .subscribe((players) => this.players = players);
  }

  private _bind_team(): void {
    this._gameService.get$('team')
      .pipe(takeUntil(this.destroy$))
      .subscribe((team) => this.team.data = team);
  }

  private _bind_votes(): void {
    this._gameService.get$('votes')
      .pipe(takeUntil(this.destroy$))
      .subscribe((votes) => {
        this.hasVoted.data = votes.map((vote) => vote !== Vote.notVoted);
        this.vote.data = votes.map((vote) => vote === Vote.upvoted);
      });
  }

  private _bind_playedCards(): void {
    this._gameService.get$('playedCards')
      .pipe(takeUntil(this.destroy$))
      .subscribe((playedCards) => {
        this.hasPlayed.data = playedCards.map((vote) => vote !== MissionCard.none);
      });
  }

  private _bind_investigator(): void {
    this._gameService.get$('investigator')
      .pipe(takeUntil(this.destroy$))
      .subscribe((investigator) => {
        this.investigator.data = investigator;
      });
  }
}

export interface TableMethods {
  setVisibility(value: any): void;
  onInit(value: any): void;
}

export interface ColumnMethods {
  setColumnVisibility(column: keyof ITable, value: boolean): void;
  setColumnReadonly(column: keyof ITable, value: boolean): void;
}

export interface ITable {
  team?: IColumn;
  hasVoted?: IColumn;
  vote?: IColumn;
  hasPlayed?: IColumn;
  investigator?: IColumn;
}

export interface IColumn {
  heading: string;
  data: boolean[];
  trueIcon?: string;
  falseIcon?: string;
  readonly: boolean;
  display: boolean;
}
