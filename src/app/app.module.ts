import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ArtisanComponent } from './artisan/artisan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { RouterModule } from '@angular/router';
import { ArtisansSheetComponent } from './artisans-sheet/artisans-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArtisanComponent,
    ArtisansSheetComponent,
  ],
  imports: [FormsModule, BrowserModule, AppRoutingModule, RouterModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
