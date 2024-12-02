import { Component, Inject, Renderer2 } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { DOCUMENT } from '@angular/common';
import { TaskServiceService } from '../../shared/task-service.service';
import { BackgroundServiceService } from '../../shared/background-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss',
})
export class MainViewComponent {
  board!: Board;
  selectedColumn!: Column;
  isModalColumnActive: boolean = false;
  isModalTaskActive: boolean = false;
  newColumnName: string = '';
  newTaskName: string = '';

  //test
  columnForm!: FormGroup;
  taskForm! : FormGroup;
  existentColumnName!: boolean;
  //test

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private taskService: TaskServiceService,
    private bgService: BackgroundServiceService,
    private fb: FormBuilder
  ) {
    this.columnForm = this.fb.group({
      columnName: ['', [Validators.required]],
    });
    this.taskForm = this.fb.group({
      taskName: ['', [Validators.required]],
      column: [null, [Validators.required]],
    });
  }
  htmlEl: any;
  ngOnInit() {
    this.htmlEl = this.document.documentElement;
    this.board = this.taskService.getAll();
    this.backgroundServiceChecker();
  }



deleteColumn(num: number){}

  addTask(){
    if (this.taskForm.invalid) {
      console.log('⚠ Intento mandar formulario de nueva tarea con datos invalidos');
      return;
    }
    this.newTask(this.selectedColumn.name, this.newTaskName);
    this.newTaskName = '';
    this.taskService.saveBoard(this.board);
    this.resetTaskFormState();
  }

  addTaskAndContinue(){
    this.addTask();
    this.closeTaskModal();
  }

  addColumn() {
    if (this.columnForm.invalid) {
      console.log('⚠ Intento mandar formulario de nueva columna con nombre vacio');
      return;
    }
    if (this.board.columns.some(column => column.name.toLowerCase() === this.newColumnName.toLowerCase())) {
      console.log('⚠ La columna ya existe');
      this.existentColumnName = true;
      return;
    }
    this.newColumn(this.newColumnName);
    this.newColumnName = '';
    this.taskService.saveBoard(this.board); //guardo la nueva columna en ls
    this.resetColumnFormState();
  }
  addColumnAndContinue() {
    this.addColumn();
    if (!this.existentColumnName) {
      this.closeColumnModal();
    }
  }

  newColumn(columName: string) {
    this.board.addColumn(columName, []);
  }

  newTask(columName: string, task: string) {
    this.board.addTaskToColumn(columName, task);
  }

  resetColumnFormState() {
    this.columnForm.markAsUntouched();
    
  }
  resetTaskFormState(){
    this.taskForm.markAsUntouched();

  }
  backgroundServiceChecker() {
    const flagCheck = this.bgService.getBG();
    switch (flagCheck) {
      case 'f1':
        this.f1();
        break;
      case 'f2':
        this.f2();
        break;
      case 'f3':
        this.f3();
        break;
      case 'f4':
        this.f4();
        break;
      case 'f5':
        this.f5();
        break;
      case 'f6':
        this.f6();
        break;
      case 'f7':
        this.f7();
        break;
      case 'f8':
        this.f8();
        break;
      case 'f9':
        this.f9();
        break;
    }
  }

  saveBG(bgFlag: string) {
    this.bgService.saveBG(bgFlag);
  }
  f1() {
    this.removeCssClass();
    this.renderer.addClass(this.htmlEl, 'f1');
    this.saveBG('f1');
  }
  f2() {
    this.removeCssClass();
    this.renderer.addClass(this.htmlEl, 'f2');
    this.saveBG('f2');
  }
  f3() {
    this.removeCssClass();
    this.renderer.addClass(this.htmlEl, 'f3');
    this.saveBG('f3');
  }
  f4() {
    this.removeCssClass();
    this.renderer.addClass(this.htmlEl, 'f4');
    this.saveBG('f4');
  }
  f5() {
    this.removeCssClass();
    this.renderer.addClass(this.htmlEl, 'f5');
    this.saveBG('f5');
  }
  f6() {
    this.removeCssClass();
    this.renderer.addClass(this.htmlEl, 'f6');
    this.saveBG('f6');
  }
  f7() {
    this.removeCssClass();
    this.renderer.addClass(this.htmlEl, 'f7');
    this.saveBG('f7');
  }
  f8() {
    this.removeCssClass();
    this.renderer.addClass(this.htmlEl, 'f8');
    this.saveBG('f8');
  }
  f9() {
    this.removeCssClass();
    this.renderer.addClass(this.htmlEl, 'f9');
    this.saveBG('f9');
  }

  removeCssClass() {
    let aux = this.htmlEl;
    this.renderer.removeClass(aux, 'f1');
    this.renderer.removeClass(aux, 'f2');
    this.renderer.removeClass(aux, 'f3');
    this.renderer.removeClass(aux, 'f4');
    this.renderer.removeClass(aux, 'f5');
    this.renderer.removeClass(aux, 'f6');
    this.renderer.removeClass(aux, 'f7');
    this.renderer.removeClass(aux, 'f8');
    this.renderer.removeClass(aux, 'f9');
  }

  //DragDrop logic
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.taskService.saveBoard(this.board); //guardo el cambio de columna en ls
  }

  //Modal control

  launchColumnModal() {
    this.isModalColumnActive = true;
    
  }
  launchTaskModal() {
    this.isModalTaskActive = true;
  }

  closeColumnModal() {
    this.isModalColumnActive = false;
    this.newColumnName = '';
    this.existentColumnName = false;
    this.resetColumnFormState();

  }

  closeTaskModal() {
    this.isModalTaskActive = false;
    
  }

  onColumnChange() {
    //DEBUG
    console.log('Selected column:', this.selectedColumn);
  }
}
