import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Artisan } from './artisan.model';
import { ArtisansService } from './artisans.service';
import { SearchService } from './search.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'trouve-ton-artisan';
  logo: any = '../assets/logo.png';
  search: any = '../assets/search.png';
  picture: any = '../assets/Visuel-flou.jpeg';
  location: any = '../assets/location.png';
  searchTerm: string = '';
  sortedArtisans!: Artisan[];
  artisans!: Artisan[];

  constructor(
    private router: Router,
    private artisanService: ArtisansService,
    private searchService: SearchService,
  ) {
    this.artisanService.getArtisans().subscribe((artisans) => {
      this.artisans = artisans;
      this.sortedArtisans = [...this.artisans];
    });
  }

  //Function that calls the SearchService and retrieves the user's search

  searchArtisans(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchService.setSearchTerm(searchTerm);
    this.router.navigate(['/artisan']);
  }
}
