import { Component, OnInit } from '@angular/core';
import { Book } from '../../book'
import { BookService  }  from '../../book.service'


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  bookList: Book[] = [];
  message: string = "";

  currentBook : Book;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {


    this.bookService.getBooks().subscribe({
      next: (value: Book[] )=> this.bookList = value,
      complete: () => console.log('book service finished' + this.bookList[0].title),
      error: (mess) => this.message = mess
    })
  }

  clicked (book: Book): void {
    this.currentBook = book;
  }

}