import { Injectable } from '@angular/core';
import { Board } from '../models/board.model';
import { Column } from '../models/column.model';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  private boardKey = 'kanboard';
  private prefix = 'taiichi:'
  //Funciona como un mockup en el caso de que no tengas tareas creadas
  //Evita que la pagina cargue en blanco
  private board: Board = new Board('Kanboard', [
    new Column('Ideas', [
      "Idea 1",
      "Idea 2",
      "Idea random 277"
    ]),
    new Column('Investigacion', [
      "Lorem ipsum",
      "Idea test",
      "tarea de investigacion"
    ]),
    new Column('HACER', [
      'Agregar funcionalidad para agregar tareas',
      'Agregar funcionalidad para agregar columnas',
      'Persistencia?',
      
    ]),
    new Column('Hecho', [
      'Kanban',
      'todo list',
      'Dormir',
      'Estudiar',
      'Cambio de patron de fondo'
    ])
  ]);

  constructor() { 
    const boards = localStorage.getItem(this.prefix + this.boardKey);
    if (boards != null) {
      const parsedBoard = JSON.parse(boards);
      this.board = new Board(
      parsedBoard.name,
      parsedBoard.columns.map((col: any) => new Column(col.name, col.tasks))
    );
    } else {
      localStorage.setItem(this.prefix + this.boardKey, JSON.stringify(this.board));
    }
  }

  getAll(){
    return this.board;
  }

  saveBoard(board: Board){
    this.board = board;
    localStorage.setItem(this.prefix + this.boardKey, JSON.stringify(this.board));
  }
}
