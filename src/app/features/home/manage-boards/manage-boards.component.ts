import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'manage-boards',
  templateUrl: './manage-boards.component.html',
  styleUrls: ['./manage-boards.component.scss']
})
export class ManageBoardsComponent implements OnInit {

  items = [
    { name: 'Board' },
    { name: 'Board 2' },
    { name: 'Board 3' },
    { name: 'Board 4' },
  ];
  constructor() { }

  ngOnInit(): void {
  }

  editItem(item: any) {
    console.log('Editar:', item);
  }

  deleteItem(item: any) {
    console.log('Borrar:', item);
  }
}
