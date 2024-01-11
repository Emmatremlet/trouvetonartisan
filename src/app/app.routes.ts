import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArtisanComponent } from './artisan/artisan.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "artisan", component: ArtisanComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },];
