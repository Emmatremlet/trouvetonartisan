import { Injectable } from '@angular/core';
import { Artisan } from './artisan.model';

@Injectable({
  providedIn: 'root'
})
export class ArtisansService {

  favicon : any ="../assets/favicon.png"

  private artisans: Artisan[] = [
    {
      id: 1,
      name: 'Artisan 1',
      job: 'Métier 1',
      category: 'Bâtiment',
      location: 'Lyon',
      image: this.favicon,
      description: '',
      opinion : 4
    },
    {
      id: 2,
      name: 'Artisan 2',
      job: 'Métier 2',
      category: 'Services',
      location: 'Paris',
      image: this.favicon,
      description: '',
      opinion: 4.5
    },
    {
      id: 3,
      name: 'Artisan 3',
      job: 'Métier 3',
      category: 'Fabrication',
      location: 'Marseille',
      image: this.favicon,
      description: '',
      opinion: 3
    },
    {
      id: 4,
      name: 'Artisan 4',
      job: 'Métier 4',
      category: 'Alimentation',
      location: 'Bordeaux',
      image: this.favicon,
      description: '',
      opinion: 3
    },
  ];

getArtisans(): Artisan[] {
    return this.artisans;
  }

  
  getArtisanById(id: number): Artisan | undefined {
    return this.artisans.find(artisan => artisan.id === id);
  }
}

