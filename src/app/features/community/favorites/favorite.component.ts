import { Component, OnInit } from '@angular/core';
import { EMPTY, catchError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from 'src/app/shared/components/popup/popup.component';
import { PageEvent } from '@angular/material/paginator';
import { BoardModel } from '../../home/models/board-model';
import { CommunityService } from '../services/community.service';
import { HomeService } from '../../home/services/home.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  myBoards: BoardModel[] = [];
  value: string = '';
  cards: BoardModel[] = [];
  filteredCards: BoardModel[] = [];
  showErrorPopup = false;
  pageSize: number = 6;
  currentPageIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private communityService: CommunityService,
    private homeService: HomeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCommunityBoards();
  }

  paginate(event?: PageEvent): void {
    if (event) {
      this.currentPageIndex = event.pageIndex;
    }
    const startIndex = this.currentPageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    let filtered = this.cards.filter((card) => card.isLiked === true);

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
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(PopUpComponent, {
      data: 'No boards to show',
      height: '10rem',
      width: '20rem',
    });
  }
}
