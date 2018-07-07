import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../models/question';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;

  constructor(private srv: DataService) {

  }

  ngOnInit() {
  }
  removeQuestion(question: Question) {
    this.srv.removeQuestion(question);

  }

}
