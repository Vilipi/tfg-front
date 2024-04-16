import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { log } from 'console';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss']
})
export class BoardUserComponent implements OnInit {

  toDo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  myBoards = ['Fitness', 'Estudio', 'Casa'];

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
    console.log(this.toDo, this.done);
    this.check();
  }

  check() {
    if (this.toDo.length == 0) {
      window.alert("No tasks")
    }
  }

  onItemClick(index: number) {
    console.log(`Item clicked: ${index}`);
    this.toDo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  }

}
