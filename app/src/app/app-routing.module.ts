import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth-module/login/login.component';
import { RegisterComponent } from './modules/auth-module/register/register.component';
import { QuerySearchComponent } from './pages/query-search/query-search.component';
import { UserListComponent } from './modules/user-module/users/users.component';
import { MainComponent } from './pages/main/main.component';
import { DynamicCardPanelComponent } from './pages/dynamic-card-panel/dynamic-card-panel.component';
import { CardComponent } from './pages/card/card.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'query', component: QuerySearchComponent,},
  { path: 'card', component: CardComponent,},
  { path: 'users', component: UserListComponent},
  { path: '', redirectTo: '/register', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
