import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book } from 'src/app/book';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  @Input() book?: Book;
  @Output() bookFormClose = new EventEmitter<Book>();
  message: string = "";
  bookForm? : FormGroup  ;


  

  constructor() { }

  ngOnInit(): void {

    this.bookForm = new FormGroup({
      title: new FormControl(this.book?.title, [Validators.required, Validators.minLength(3)]),
      year_written: new FormControl(this.book?.year_written, [Validators.required, Validators.max(2024)])
    })
  }

  onSubmit() {
    console.log('forms submitted with ');
    console.table(this.bookForm?.value);
    this.bookFormClose.emit(this.bookForm?.value)
  }

  get title() {
    return this.bookForm?.get('title');
  }
  get year_written() {
    return this.bookForm?.get('year_written');
  }

  closeForm() {
    this.bookFormClose.emit(undefined)

  }


}
