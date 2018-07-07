import { Component, OnInit } from '@angular/core';
import {Data} from '@angular/router';
import {DataService} from '../../services/data.service';
import {Question} from '../../models/question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  questions: Question[];

  constructor(private srv: DataService) {}

  ngOnInit() {
    this.questions = this.srv.getQuestions();
  }
  addQuestion(question: Question) {
    this.srv.addQuestion(question);

  }

}
