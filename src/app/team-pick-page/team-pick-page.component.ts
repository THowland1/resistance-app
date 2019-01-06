import { Component, OnInit } from '@angular/core';
import { TeamPickService } from 'src/services/team-pick.service';

@Component({
  selector: 'app-team-pick-page',
  templateUrl: './team-pick-page.component.html',
  styleUrls: ['./team-pick-page.component.scss']
})
export class TeamPickPageComponent implements OnInit {

  constructor(private _teamPickService: TeamPickService) { }

  ngOnInit() {
  }

}