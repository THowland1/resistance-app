import { Component, OnInit, Input } from '@angular/core';
import { Player } from '@angular/core/src/render3/interfaces/player';
import { MissionService } from 'src/services/mission.service';

@Component({
  selector: 'app-mission-page',
  templateUrl: './mission-page.component.html',
  styleUrls: ['./mission-page.component.scss']
})
export class MissionPageComponent implements OnInit {

  constructor(private _missionService: MissionService) { }

  @Input() playerName: string;
  @Input() players: Player[];

  ngOnInit() {
  }



}
