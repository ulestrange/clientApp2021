import { Component, OnInit } from '@angular/core';
import { BookService} from '../book.service'
import {Book} from '../book'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit {

  
  testString = 'hello'

  testArray = ['a','b','c']

  books: Book[] = [];

  message: string;

  constructor(private bookService : BookService) { }


  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (value: Book[]) => this.books = value,
      complete: () => console.log('book service finished'),
      error: (message) => this.message =message

    }) 

  }


}
