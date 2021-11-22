import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/book';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList: User[] = [];
  message: string = "";



  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getUsers().subscribe({
      next: (value: User[]) => this.userList = value,
      complete: () => console.log('book service finished'),
      error: (mess) => this.message = mess
    })
  }

}
