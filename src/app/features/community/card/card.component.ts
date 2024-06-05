import { Component, Input, OnInit } from '@angular/core';
import { BoardModel } from '../../home/models/board-model';
import { CommunityService } from '../services/community.service';
import { PopUpComponent } from 'src/app/shared/components/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, catchError } from 'rxjs';
import { BoardFacade } from '../../home/services/board.facade';
import { LoginFacade } from '../../login/service/login.facade';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() data: any;
  showTasks = false;
  cards: BoardModel[] = [];
  followingBoards: number;
  isProUser = false;


  constructor(private communityService: CommunityService, public dialog: MatDialog, public boardFacade: BoardFacade, private loginFacade: LoginFacade) { }

  ngOnInit(): void {
    this.loginFacade.getLoginFacade().subscribe((data) => {
      this.isProUser = data.userType === 'pro' ? true : false;
    });
  }

  toggleTasks() {
    this.showTasks = !this.showTasks;
  }

  toggleFovorite(id: number) {
    this.boardFacade.getFollowingBoards().subscribe((total) => {
      this.followingBoards = total;
    });
    if(this.followingBoards >=1 && this.isProUser === false && this.data.isLiked !== true){
      this.openDialog('You can only add up to 1 board to your favorites, upgrade to plus plan to add more!');
    } else if(this.followingBoards >=4 && this.isProUser === true && this.data.isLiked !== true){
      this.openDialog('You can only add up to 4 boards to your favorites, unfollow some boards to to add more!');
    } else {
      this.data.isLiked = !this.data.isLiked;
      this.communityService.toogleApiBoard(id).subscribe(result =>{
        this.openDialog(this.data.isLiked ? 'Board added to favorites and ready to use' : 'Board removed from favorites');
        if(this.data.isLiked){
          this.followingBoards +=1;
        } else{
          this.followingBoards -=1;
        }
        this.boardFacade.setFollowingBoards(this.followingBoards);
      });
    }
  }

  private openDialog(message: string) {
    const dialogRef = this.dialog.open(PopUpComponent, {
      data: `${message}`,
      height: '14rem',
      width: '20rem',
    });
  }
}
