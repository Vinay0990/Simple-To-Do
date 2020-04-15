import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-display-todo',
  templateUrl: './display-todo.component.html',
  styleUrls: ['./display-todo.component.css']
})
export class DisplayTodoComponent implements OnInit {
  getResTemp
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.getRequest().subscribe(data =>{
      this.getResTemp = data;
      console.log(data);
      
    })
  }


}
