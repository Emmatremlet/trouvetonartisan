import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArtisanComponent } from './artisan/artisan.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "artisan", component: ArtisanComponent },
    { path: 'batiment', component: ArtisanComponent, data: { category: 'Bâtiment' } },
    { path: 'services', component: ArtisanComponent, data: { category: 'Services' } },
    { path: 'fabrication', component: ArtisanComponent, data: { category: 'Fabrication' } },
    { path: 'alimentation', component: ArtisanComponent, data: { category: 'Alimentation' } },
    { path: '', redirectTo: '/', pathMatch: 'full' },
];
    
export class AppRoutingModule { }