import { Component, OnInit } from "@angular/core";
import { CommunityService } from "./services/community.service";
import { catchError } from "rxjs";


@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {

  value: string = '';


  constructor(private communityService: CommunityService) { }

  ngOnInit(): void {
    this.getCommunityBoards();
  }

  cards = [
    { title: 'AAA', description: 'This is card 1' },
    { title: 'Card 2', description: 'This is card 2' },
  ];
  filteredCards = this.cards;


  onSearch(searchText: string) {
    this.filteredCards = this.cards.filter(card =>
      card.title.toLowerCase().includes(searchText.toLowerCase())
    );  
  }

  getCommunityBoards(){
    this.communityService.getCommunityBoards().pipe(
      catchError(error => {
        return error;
      })
    ).subscribe(result => {
      console.log(result)
      });
  }
}
