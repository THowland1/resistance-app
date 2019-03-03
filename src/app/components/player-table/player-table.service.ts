import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ITable, ColumnMethods, TableMethods } from './player-table.component';

@Injectable({
  providedIn: 'root'
})
export class PlayerTableService {

  constructor() { }

  messageBus = {
    tableCommands$: new Subject<ITableCommand>(),
    columnCommands$: new Subject<IColumnCommand>()
  };

  setVisibility(value: boolean): void {
    this._send_tableCommand('setVisibility',value);
  }

  initialiseTable(): void {
    this._send_tableCommand('onInit');
  }

  setColumnVisibility(column: keyof ITable, value: boolean): void {
    this._send_columnCommand('setColumnVisibility', column, value);
  }

  setColumnReadonly(column: keyof ITable, value: boolean): void {
    this._send_columnCommand('setColumnReadonly', column, value);
  }

  private _send_tableCommand(method:keyof TableMethods, data?: any) {
    this.messageBus.tableCommands$.next({method, data});
  }

  private _send_columnCommand(method:keyof ColumnMethods, target: keyof ITable, data?: any) {
    this.messageBus.columnCommands$.next({method, target, data});
  }

}

export interface ITableCommand {
  method: keyof TableMethods;
  data?: any;
}

export interface IColumnCommand {
  method: keyof ColumnMethods;
  target: keyof ITable;
  data?: any;
}