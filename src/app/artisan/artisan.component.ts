import { Component } from '@angular/core';

@Component({
  selector: 'app-artisan',
  standalone: true,
  imports: [],
  templateUrl: './artisan.component.html',
  styleUrl: './artisan.component.css',
})
export class ArtisanComponent {
  location: any = '../assets/location.png';
  search: any = '../assets/search.png';
  favicon: any = '../assets/favicon.png';

  artisans = [
    { name: 'Artisan 1', category: 'Bâtiment', location: 'Lyon', rating: 4 },
    { name: 'Artisan 2', category: 'Services', location: 'Paris', rating: 5 },
    {
      name: 'Artisan 3',
      category: 'Alimentation',
      location: 'Marseille',
      rating: 3,
    },
    {
      name: 'Artisan 4',
      category: 'Fabrication',
      location: 'Bordeaux',
      rating: 2,
    },
  ];

  selectedCategory: string = '';

  filterArtisans() {
    return this.selectedCategory
      ? this.artisans.filter(
          (artisan) => artisan.category === this.selectedCategory,
        )
      : this.artisans;
  }
}
