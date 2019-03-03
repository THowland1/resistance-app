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

  get columns(): IColumn[] {
    return [
      this.team,
      this.hasVoted,
      this.vote
    ].filter((column) => column.display === true);
  }

  onColChange(): void {
    this._gameService.update('team',this.team.data);
    this._gameService.saveChanges();
  }

  // Table commands
  setVisibility(value: boolean): void {
    this.isTableVisible = value;
  }

  onInit(): void {
    if(this.isInitialised) {
      return;
    }
    this._bind_players();
    this._bind_team();
    this._bind_votes();
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
    this._gameService.get('team')
      .pipe(takeUntil(this.destroy$))
      .subscribe((team) => this.team.data = team);
  }

  private _bind_votes(): void {
    this._gameService.get('votes')
      .pipe(takeUntil(this.destroy$))
      .subscribe((votes) => {
        this.hasVoted.data = votes.map((vote) => vote !== Vote.notVoted);
        this.vote.data = votes.map((vote) => vote === Vote.upvoted);
      });
  }
}

export interface TableMethods {
  setVisibility(value: boolean): void;
  onInit(): void;
}

export interface ColumnMethods {
  setColumnVisibility(column: keyof ITable, value: boolean): void;
  setColumnReadonly(column: keyof ITable, value: boolean): void;
}

export interface ITable {
  team?: IColumn;
  hasVoted?: IColumn;
  vote?: IColumn;
}

export interface IColumn {
  heading: string;
  data: boolean[];
  trueIcon?: string;
  falseIcon?: string;
  readonly: boolean;
  display: boolean;
}
