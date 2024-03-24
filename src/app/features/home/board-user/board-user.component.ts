import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { log } from 'console';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss']
})
export class BoardUserComponent implements OnInit {
  
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  // todo = [
  //   { text: 'Get to work', done: false },
  //   { text: 'Pick up groceries', done: false },
  //   { text: 'Go home', done: false },
  //   { text: 'Fall asleep', done: false },
  //  ];
   
  //  done = [
  //   { text: 'Get up', done: true },
  //   { text: 'Brush teeth', done: true },
  //   { text: 'Take a shower', done: true },
  //   { text: 'Check e-mail', done: true },
  //   { text: 'Walk dog', done: true },
  //  ];

  constructor() { }

  ngOnInit(): void {
    this.check();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    console.log(this.todo, this.done);
    this.check();
  }

  check() {
    if(this.todo.length == 0){
      window.alert("No tasks")
    }
  }
}
