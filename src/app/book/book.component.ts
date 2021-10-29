import { Component, OnInit } from '@angular/core';
import {IBook} from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: IBook[];
  test : string[];
  

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    // this.getBooks();
    // this.test = ['a','b','c']
  }

  // getBooks(): void {

  //   this.bookService.getBooks()
  //   .subscribe (books => {
  //     console.log(books.length);
  //     this.books = books })
  // }
}


