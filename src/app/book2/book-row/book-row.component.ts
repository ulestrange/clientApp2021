import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/book';

@Component({
  selector: 'app-book-row',
  templateUrl: './book-row.component.html',
  styleUrls: ['./book-row.component.css']
})
export class BookRowComponent implements OnInit {

  @Input() book?: Book;

  constructor() { }

  ngOnInit(): void {
  }

}