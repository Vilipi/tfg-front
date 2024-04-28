import { Component, OnInit } from "@angular/core";
import { CommunityService } from "./services/community.service";
import { EMPTY, catchError } from "rxjs";
import { BoardModel } from "../home/models/board-model";
import { HomeService } from "../home/services/home.service";


@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  myBoards: BoardModel[];
  value: string = '';
  cards: BoardModel[] = [];
  filteredCards = this.cards;


  constructor(private communityService: CommunityService, private homeService: HomeService) { }

  ngOnInit(): void {
    this.getCommunityBoards();
  }

  onSearch(searchText: string) {
    this.filteredCards = this.cards.filter(card =>
      card.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  getCommunityBoards() {
    this.communityService.getCommunityBoards().pipe(
      catchError(error => {
        return error;
      })
    ).subscribe(result => {
      this.cards = result;
      this.filteredCards = this.cards;
      this.checkIfLiked();

    });
  }

  private checkIfLiked(): void {
    this.homeService.getMyApiBoards().pipe(
      catchError(error => {
        return EMPTY;
      }
      )
    ).subscribe(
      result => {
        this.myBoards = result;
        this.cards.forEach(card => {
          const myCard = this.myBoards.find(e => e.originalBoardId == card.id);
          if (myCard) {
            card.isLiked = true;
          } else {
            card.isLiked = false;
          }
        })
      }
    )
  }
}
