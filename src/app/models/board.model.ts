import { Column } from "./column.model";

export class Board {
    constructor(public name: string, public columns: Column[]){}

    public addColumn(name: string, tasks: string[] = []){
        this.columns.push(new Column(name, tasks));
    }

    public addTaskToColumn(nameColumn: string, task: string): boolean{
        let selectedColumn = this.columns.find(col => col.name === nameColumn);
        if (selectedColumn != null) {
            selectedColumn.addTask(task);
            return true;
        }
        else{
            return false;
        }
    }
}