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
  showBookForm: boolean = false;

  currentBook? : Book = undefined;

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
    this.currentBook = undefined;
    this.showBookForm = true;
  }

  openEditBook(): void {
    this.showBookForm = true;
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
    this.showBookForm = false;
  }

  bookFormClose(book?: Book): void{
    this.showBookForm = false;
    console.table(book);
    if (book == null){
      this.currentBook = undefined
    }
    else if (this.currentBook == null){
      this.addNewBook(book);
    }
    else {
      this.message = "book has been updated";
      console.log('need to update book with id ' + this.currentBook._id);
     // this.updateBook(this.currentBook._id, book)
    }
  }

}