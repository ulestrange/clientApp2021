import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book } from 'src/app/book';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  @Output() newBookEvent = new EventEmitter<Book>();
  message: string = "";


  bookForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    year_written: new FormControl('', [Validators.required, Validators.max(2024)])
  })

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('forms submitted with ');
    console.table(this.bookForm.value);
    this.newBookEvent.emit(this.bookForm.value)
  }

  get title() {
    return this.bookForm.get('title');
  }
  get year_written() {
    return this.bookForm.get('year_written');
  }



}
