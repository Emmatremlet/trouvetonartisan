import { Component, Input } from '@angular/core';
import { ArtisansService } from '../artisans.service';
import { Artisan } from '../artisan.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artisan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artisan.component.html',
  styleUrl: './artisan.component.css',
})
export class ArtisanComponent {
  location: any = '../assets/location.png';
  search: any = '../assets/search.png';
  favicon: any = '../assets/favicon.png';
  @Input() id: number = 0;
  artisans: Artisan [];
  sortedArtisans: Artisan[];
  selectedCategory: string = '';
  searchTerm: string = '';
  artisan: Artisan | undefined;

  constructor(private artisanService: ArtisansService) {
    this.artisans = artisanService.getArtisans();
    this.sortedArtisans = [...this.artisans];
  }

  searchArtisans(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.searchTerm = target.value;
    this.sortedArtisans = this.artisans.filter(artisan =>
      artisan.name.toLowerCase().includes(target.value.toLowerCase())
    );
  }

  sortArtisans(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedCategory = target.value;
  
    if (this.selectedCategory) {
      this.sortedArtisans = this.artisans.filter(artisan =>
        artisan.category === this.selectedCategory
      );
    } else {
      this.sortedArtisans = [...this.artisans];
    }
  }
  
}
