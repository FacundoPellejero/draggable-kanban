export class Column {
    constructor(public name: string, public tasks: string[]){}

    addTask(task: string){
        this.tasks.push(task);
    }
}