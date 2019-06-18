import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [],
  providers : [TodoService]
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  item= {$key : '', text: ''}
  constructor(private toDoService: TodoService) { }

  ngOnInit() {
    this.toDoService.getToDoList().snapshotChanges()
    .subscribe(item => {
      this.toDoListArray = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.toDoListArray.push(x);
      })

      //sort array isChecked false  -> true
        this.toDoListArray.sort((a,b) => {
          return a.isChecked - b.isChecked;
        })
    });
  }

  onAdd(itemTitle) {
    if(itemTitle.$key !== ''){
      this.toDoService.updateTodo(itemTitle.$key , itemTitle.text);
    }
    else{
      this.toDoService.addTitle(itemTitle.text);
    }
    this.item.text = '';
    this.item.$key = '';
  }

  alterCheck($key: string,isChecked) {
    this.toDoService.checkOrUnCheckTitle($key,!isChecked);
  }

  onDelete($key : string){
    this.toDoService.removeTitle($key);
  }

  updateTodo(item){
    console.log(item);
    this.item.text = item.title;
    this.item.$key = item.$key;
  }

}
