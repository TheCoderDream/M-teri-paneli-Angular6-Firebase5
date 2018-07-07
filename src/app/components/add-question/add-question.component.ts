import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Question} from '../../models/question';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  text: string;
  answer: string;

  @Output() questionAdded = new EventEmitter<Question>();

  constructor() { }

  ngOnInit() {
  }

  addQuestion() {
    this.questionAdded.emit({text: this.text, answer: this.answer, hide: true});
  }

}
