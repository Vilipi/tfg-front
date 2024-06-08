import { Component, OnInit } from '@angular/core';
import { EMPTY, catchError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from 'src/app/shared/components/popup/popup.component';
import { PageEvent } from '@angular/material/paginator';
import { BoardModel } from '../../home/models/board-model';
import { CommunityService } from '../services/community.service';
import { HomeService } from '../../home/services/home.service';
import { BoardFacade } from '../../home/services/board.facade';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
})
export class SocialComponent implements OnInit {
  myBoards: BoardModel[] = [];
  value: string = '';
  cards: BoardModel[] = [];
  filteredCards: BoardModel[] = [];
  showErrorPopup = false;
  pageSize: number = 6;
  currentPageIndex: number = 0;
  followingBoards: number;
  mostFollows: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private communityService: CommunityService,
    private homeService: HomeService,
    public dialog: MatDialog,
    public boardFacade: BoardFacade
  ) {}

  ngOnInit(): void {
    this.getCommunityBoards();
  }

  onSearch(searchText: string) {
    this.currentPageIndex = 0;
    if (searchText.length >= 3) {
      this.filteredCards = this.cards.filter((card) =>
        card.name.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      this.filteredCards = this.cards;
      this.paginate();
    }
  }

  paginate(event?: PageEvent): void {
    if (event) {
      this.currentPageIndex = event.pageIndex;
    }
    const startIndex = this.currentPageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    let filtered = this.cards;

    this.filteredCards = filtered.slice(startIndex, endIndex);
  }

  getCommunityBoards() {
    this.communityService
      .getCommunityBoards()
      .pipe(
        catchError((error) => {
          return EMPTY;
        })
      )
      .subscribe((result) => {
        this.cards = result;
        this.filteredCards = this.cards;
        this.paginate();

        this.followingBoards = this.cards.filter((card) => card.isLiked === true).length;
        this.boardFacade.setFollowingBoards(this.followingBoards);
      });
  }

  filterByMostFollows() {
    if(this.mostFollows === false) {
    this.mostFollows = true;
    this.cards.sort((a, b) => {
      if (a.followers === undefined || b.followers === undefined) {
        return 0;
      }
      return b.followers - a.followers;
    });
    
    // Mostrar solo las tres tarjetas con más seguidores
    this.filteredCards = this.cards.slice(0, 3);
    } else {
      this.mostFollows = false;
      this.paginate();
    }
  }
  
  
  

  openDialog() {
    const dialogRef = this.dialog.open(PopUpComponent, {
      data: 'No boards to show',
      height: '10rem',
      width: '20rem',
    });
  }
}
