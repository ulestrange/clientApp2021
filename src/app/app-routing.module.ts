import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './book2/book-list/book-list.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import {HomeComponent} from './home/home.component';
import {UserListComponent} from './user/user-list/user-list.component'
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'books',component: BookListComponent},
 //{path: 'users', component: UserListComponent },
  {path: 'users', component: UserListComponent,  canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
