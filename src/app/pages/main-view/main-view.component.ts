import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Board } from '../../modules/board.model';
import { Column } from '../../modules/column.model';


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent {



  board: Board = new Board('Test Board', [
    new Column('Ideas', [
      "Idea 1",
      "Idea 2",
      "Idea random 277"
    ]),
    new Column('Investigacion', [
      "Lorem ipsum",
      "foo",
      "tarea de investigacion"
    ]),
    new Column('HACER', [
      'Terminar tareas',
      'Rellenear tareas',
      'lorem ipsum sit et amet',
      'lorem'
    ]),
    new Column('Hecho', [
      'Kanban',
      'todo list',
      'Dormir',
      'Leer',
      'Estudiar'
    ])
  ]);

  constructor(){}



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
  }
}
