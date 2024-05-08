import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { QuerySearchComponent } from './pages/query-search/query-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { TreeTableModule } from 'primeng/treetable';
import { TableModule } from 'primeng/table';
import { SidebarModule} from "primeng/sidebar";
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RegisterComponent } from './modules/auth-module/register/register.component';
import { LoginComponent } from './modules/auth-module/login/login.component';
import { LogoutComponent } from './modules/auth-module/logout/logout.component';
import { UserListComponent } from './modules/user-module/users/users.component';
import { SidebarComponent } from './common/components/sidebar/sidebar.component';
import { RippleModule } from 'primeng/ripple';
import { DynamicCardPanelComponent } from './pages/dynamic-card-panel/dynamic-card-panel.component';
import { MainComponent } from './pages/main/main.component';
import { BCardComponent } from './modules/card-module/bcard/bcard.component';
import { CCardComponent } from './modules/card-module/ccard/ccard.component';
import { ACardComponent } from './modules/card-module/acard/acard.component';
import { CardComponent } from './pages/card/card.component';
import { MapComponent } from './modules/map-module/map/map.component';
import { AuthInterceptor } from './common/interceptor/auth.interceptor';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TasksComponent } from './modules/task-module/task/task.component';
@NgModule({
  declarations: [
    AppComponent,
    QuerySearchComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    UserListComponent,
    SidebarComponent,
    DynamicCardPanelComponent,
    MainComponent,
    ACardComponent,
    BCardComponent,
    CCardComponent,
    CardComponent,
    MapComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    TreeTableModule,
    TableModule,
    SelectButtonModule,
    InputTextModule,
    ButtonModule,
    SidebarModule,
    RippleModule,
    CardModule,
    DialogModule,
    DropdownModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
