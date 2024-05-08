import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth-module/login/login.component';
import { RegisterComponent } from './modules/auth-module/register/register.component';
import { QuerySearchComponent } from './pages/query-search/query-search.component';
import { UserListComponent } from './modules/user-module/users/users.component';
import { CardComponent } from './pages/card/card.component';
import { MapComponent } from './modules/map-module/map/map.component';
import { AuthGuard } from './common/guards/auth-guard';
import { TasksComponent } from './modules/task-module/task/task.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'query', component: QuerySearchComponent,},
  { path: 'dynamic', component: CardComponent,},
  { path: 'users', component: UserListComponent,canActivate: [AuthGuard]},
  { path: 'map', component: MapComponent},
  { path: 'task', component: TasksComponent},
  { path: '', redirectTo: '/register', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
