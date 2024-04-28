import { Component, Input, OnInit } from '@angular/core';
import { BoardModel } from '../../home/models/board-model';
import { CommunityService } from '../services/community.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() data: BoardModel;
  showTasks = false;

  constructor(private communityService: CommunityService) { }

  ngOnInit(): void {    
  }

  toggleTasks() {
    this.showTasks = !this.showTasks;
  }

  toggleFovorite(id: number) {
    this.data.isLiked = !this.data.isLiked;
    this.communityService.toogleApiBoard(id).subscribe(result =>{
      console.log(result)
    });
  }
}
