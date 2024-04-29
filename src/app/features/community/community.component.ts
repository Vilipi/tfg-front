import { Component, OnInit } from '@angular/core';
import { CommunityService } from './services/community.service';
import { EMPTY, catchError } from 'rxjs';
import { BoardModel } from '../home/models/board-model';
import { HomeService } from '../home/services/home.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from 'src/app/shared/components/popup/popup.component';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
})
export class CommunityComponent implements OnInit {
  myBoards: BoardModel[];
  value: string = '';
  cards: BoardModel[] = [];
  filteredCards = this.cards;

  showErrorPopup = false;
  
  isCommunity: boolean;
  isFavorites: boolean;

  constructor(
    private route: ActivatedRoute,
    private communityService: CommunityService,
    private homeService: HomeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getRouterData();
    this.getCommunityBoards();
  }

  onSearch(searchText: string) {
    this.filteredCards = this.cards.filter((card) =>
      card.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  getRouterData() {
    this.route.data.subscribe((data) => {
      this.isCommunity = data['community'];
      this.isFavorites = data['favorites'];
    });
  }

  getCommunityBoards() {
    this.communityService
      .getCommunityBoards()
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((result) => {
        this.cards = result;
        this.filteredCards = this.cards;
        this.checkIfLiked();
      });
  }

  private checkIfLiked(): void {
    this.homeService
      .getMyApiBoards()
      .pipe(
        catchError((error) => {
          if(this.isFavorites){
            this.showErrorPopup = true;
          }
          return EMPTY;
        })
      )
      .subscribe((result) => {
        if(!this.showErrorPopup){
          this.myBoards = result;
        this.cards.forEach((card) => {
          const myCard = this.myBoards.find(
            (e) => e.originalBoardId == card.id
          );
          if (myCard) {
            card.isLiked = true;
          } else {
            card.isLiked = false;
          }
        });

        if (this.isCommunity) {
          this.filteredCards = this.cards;
        } else if (this.isFavorites) {
          this.filteredCards = this.cards.filter((card) => card.isLiked);
        } else {
          this.filteredCards = this.cards;
        }
        }
        
      })
  }

  openDialog() {
    const dialogRef = this.dialog.open(PopUpComponent, {
      data: 'No boards to show',
      height: '10rem',
      width: '20rem',
    });
  }
}
