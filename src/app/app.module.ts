import { LogInComponent } from './log-in/log-in.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { DiarypageComponent } from './diarypage/diarypage.component';
import { HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { MovieDetailsPageComponent } from './movie-details-page/movie-details-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    NavbarComponent,
    HomepageComponent,
    HeaderComponent,
    DiarypageComponent,
    MovieDetailsPageComponent
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
