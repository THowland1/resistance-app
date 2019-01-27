import { Component, OnInit, Input } from '@angular/core';
import { Player } from '@angular/core/src/render3/interfaces/player';

@Component({
  selector: 'app-game-over-page',
  templateUrl: './game-over-page.component.html',
  styleUrls: ['./game-over-page.component.scss']
})
export class GameOverPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() playerName: string;
  @Input() players: Player[];

}
