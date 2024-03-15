import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ArtisanComponent } from './artisan/artisan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { RouterModule } from '@angular/router';
import { ArtisansSheetComponent } from './artisans-sheet/artisans-sheet.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ArtisansService } from './artisans.service';
import { OpinionPipe } from './opinion.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArtisanComponent,
    ArtisansSheetComponent,
    OpinionPipe,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    OpinionPipe
  ],
  providers: [ArtisansService, provideHttpClient()],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
