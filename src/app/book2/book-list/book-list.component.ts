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
  addBook: boolean = false;

  currentBook! : Book;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {


    this.bookService.getBooks().subscribe({
      next: (value: Book[] )=> this.bookList = value,
      complete: () => console.log('book service finished'),
      error: (mess) => this.message = mess
    })
  }

  clicked (book: Book): void {
    this.currentBook = book;
    console.table(this.currentBook)
  }

  isSelected(book: Book): boolean{
    if (!book || !this.currentBook) {
      return false;
    }
    else {

      return book._id === this.currentBook._id;
    }
  }

  openAddBook(): void {
    this.currentBook = null;
    this.addBook = true;
  }

  addNewBook(newBook: Book): void {
    console.log('adding new book ' + JSON.stringify(newBook));
    this.bookService.addBook({ ...newBook })
      .subscribe({
        next: book => {
          console.log(JSON.stringify(book) + ' has been added');
        this.message = "new book has been added";},
        error: (err) => this.message = err
      });
    this.addBook = false;
  }

}