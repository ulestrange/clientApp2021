import { Component, OnInit } from '@angular/core';
import {Book} from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: Book[];
  message: string ;

  constructor(private bookService : BookService) { }


  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (value: Book[]) => this.books = value,
      complete: () => console.log('book service finished'),
      error: (message) => this.message =message

    }) 

  }

}


