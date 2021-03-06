import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public todos: Todo[] = [];
  public title: String = 'Minhas Tarefas';
  public form : FormGroup; 
  public mode = 'list';

  constructor(private fb:FormBuilder){ //chamado toda vez que inicia o component 
    this.form = this.fb.group({
      title:['',Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(60),
        Validators.required
      ])]
    });
    this.load();

/*
    this.todos.push(new Todo(1,'Estudar angular',false));
    this.todos.push(new Todo(2,'Estudar .NET',false));
    this.todos.push(new Todo(3,'Fazer trilha',false));      
    this.todos.push(new Todo(4,'Ver meu amorzinho',false));      */
  }


  add(){
    //const {title}  = this.form.value;
    const title  = this.form.controls['title'].value;
    const id = this.todos.length+1;
    this.todos.push(new Todo(id,title,false));
    this.save();
    this.clear();    
  }

  remove(todo:Todo){
    const index = this.todos.indexOf(todo);
    if(index !== -1){
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(todo:Todo){
    todo.done = true;
    this.save();
  }


  markAsUndone(todo:Todo){
    todo.done = false; 
    this.save();
  }

  clear(){
    this.form.reset();
  }


  save(){
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos',data);
    this.mode='list';
  }

  load(){
    const data  = localStorage.getItem('todos');
    if(data!=null){
      this.todos = JSON.parse(data);    
    }
  }

  changeMode(mode:string){
    this.mode = mode;
  }



}
