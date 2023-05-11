import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'
import {QuillModule} from 'ngx-quill'

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
  FooterComponent,
  HeaderComponent,
  LoginComponent,
  LoginFormComponent,
  PostComponent,
  PostFormComponent,
  PostsComponent,
  RegisterComponent,
  RegisterFormComponent
} from './components';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MainLayoutComponent} from "./layouts";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatBadgeModule} from "@angular/material/badge";
import {Error404Component} from './components/error404/error404.component';
import {MatIconModule} from "@angular/material/icon";
import {HomeComponent} from './components/home/home.component';
import {PostCreateEditComponent} from './components/post-create-edit/post-create-edit.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainLayoutComponent,
    PostComponent,
    PostsComponent,
    LoginComponent,
    LoginFormComponent,
    RegisterFormComponent,
    RegisterComponent,
    PostFormComponent,
    FooterComponent,
    Error404Component,
    HomeComponent,
    PostCreateEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    CommonModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatBadgeModule,
    MatIconModule,
    QuillModule.forRoot(),
    MatProgressBarModule
  ],
  providers: [MatDialog],
  bootstrap: [AppComponent]
})
export class AppModule {
}
