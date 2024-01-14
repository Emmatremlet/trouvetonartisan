import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArtisanComponent } from './artisan/artisan.component';
import { ArtisansSheetComponent } from './artisans-sheet/artisans-sheet.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "artisan", component: ArtisanComponent },
    { path: 'services', component: ArtisanComponent, data: { category: 'Services' } },
    { path: 'fabrication', component: ArtisanComponent, data: { category: 'Fabrication' } },
    { path: 'alimentation', component: ArtisanComponent, data: { category: 'Alimentation' } },
    { path: 'batiment', component: ArtisanComponent, data: { category: 'Bâtiment' } },    
    { path: "artisansheet/:id", component: ArtisansSheetComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found' }
];
    
export class AppRoutingModule { }