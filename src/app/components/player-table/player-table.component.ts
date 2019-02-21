import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from 'src/models/player';
import { Team } from 'src/enums/team.enum';
import { Role } from 'src/enums/role.enum';
import { ModalService } from '../modal/modal.service';
import { PlayerService } from 'src/services/player.service';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})
export class PlayerTableComponent implements OnInit {

  constructor(
    private _playerService: PlayerService,
    private _modalService: ModalService) { }

  @Input() columns: IColumn;
  @Input() isReadonly: boolean;
  @Output() teamChange: EventEmitter<string> = new EventEmitter(); // [TODO] - Limit this to a type of Team/Investigator/etc
  
  players: Player[] = this._playerService.players;

  ngOnInit() {
    this._sanityChecks();
  }

  onTeamChange(position: string/*[TODO] - change this to a type*/): void {
    this.teamChange.emit(position);
  }

  get columnHeadings(): string[] {
    return Object.keys(this.columns);
  }

  get columnData(): boolean[][] {
    return this.columnHeadings.map((heading) => {
      return this.columns[heading];
    })
  }

  private _sanityChecks(): void {
    // Are all columns the same size 
    const columnsCorrectlength: boolean = this.columnData.every((column) => column.length === this.players.length);
    if(!columnsCorrectlength){
      this._modalService.error('Internal error', ['Inconsistent column length'])
    }
  }
}

export interface IColumn {
  [heading: string]: boolean[]
}
