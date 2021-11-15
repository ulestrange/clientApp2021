import { Component, OnInit } from '@angular/core';
import { Book } from '../../book'
import { BookService } from '../../book.service'


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  bookList: Book[] = [];
  message: string = "";
  showBookForm: boolean = false;

  currentBook?: Book = undefined;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {

    this.bookService.getBooks().subscribe({
      next: (value: Book[]) => this.bookList = value,
      complete: () => console.log('book service finished'),
      error: (mess) => this.message = mess
    })
  }

  clicked(book: Book): void {
    this.currentBook = book;
    console.table(this.currentBook)
  }

  isSelected(book: Book): boolean {
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
          this.message = "new book has been added";
        },
        error: (err) => this.message = err
      });

    // so the updated list appears

    this.bookService.getBooks().subscribe({
      next: (value: Book[]) => this.bookList = value,
      complete: () => console.log('book service finished'),
      error: (mess) => this.message = mess
    })
  }

  updateBook(id: string, book: Book): void {
    console.log('updating ' + JSON.stringify(book));
    this.bookService.updateBook(id, book)
      .subscribe({
        next: book => {
          console.log(JSON.stringify(book) + ' has been updated');
          this.message = " book has been updated";
        },
        error: (err) => this.message = err
      });
    // so the updated list appears

    this.bookService.getBooks().subscribe({
      next: (value: Book[]) => this.bookList = value,
      complete: () => console.log('book service finished'),
      error: (mess) => this.message = mess
    })

    this.currentBook = undefined;
  }


  /* either the form has closed without saving or new book details have been
  entered or a book has been updated */

  bookFormClose(book?: Book): void {
    this.showBookForm = false;
    console.table(book);
    if (book == null) {
      this.message = "form closed without saving";
      this.currentBook = undefined
    }
    else if (this.currentBook == null) {
      this.addNewBook(book);
    }
    else {
      this.updateBook(this.currentBook._id, book)
    }
  }

// note: Bad UX there is no check that the user wants to delete the book and hasn't just 
// hit the button by mistake

  deleteBook() {
    console.log('deleting a book ');
    if (this.currentBook) {
      this.bookService.deleteBook(this.currentBook._id)
        .subscribe({
          next: book => {
            console.log(JSON.stringify(book) + ' has been added');
            this.message = "book has been deleted";
          },
          error: (err) => this.message = err
        });
    }

    // so the updated list appears

    this.bookService.getBooks().subscribe({
      next: (value: Book[]) => this.bookList = value,
      complete: () => console.log('book service finished'),
      error: (mess) => this.message = mess
    })

  }


  dismissAlert() {
    this.message = "";
  }

}