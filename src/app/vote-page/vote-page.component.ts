import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vote-page',
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.scss']
})
export class VotePageComponent implements OnInit {

  constructor() { }
  
  @Input() playerName: string;
  
  ngOnInit() {
  }

  submitVote(vote: boolean){
    
  }

}
