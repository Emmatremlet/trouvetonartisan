import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtisansService } from '../artisans.service';
import { Artisan } from '../artisan.model';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-artisan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artisan.component.html',
  styleUrl: './artisan.component.css',
})
export class ArtisanComponent implements OnInit{
  location: any = '../assets/location.png';
  search: any = '../assets/search.png';
  favicon: any = '../assets/favicon.png';
  @Input() id: number = 0;
  artisans!: Artisan [];
  sortedArtisans!: Artisan[];
  selectedCategory: string = '';
  searchTerm: string = '';
  category!: string;

  artisan: Artisan | undefined;

  

  constructor(private artisanService: ArtisansService, private route: ActivatedRoute, private cdRef: ChangeDetectorRef) {
    this.artisanService.getArtisans().subscribe(artisans => {
      this.artisans = artisans;
      this.sortedArtisans = [...this.artisans];
    });
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
  filterArtisansByCategory(category: string): void {
    this.artisanService.getArtisans().subscribe(artisans => {
      this.sortedArtisans = artisans.filter(artisan => artisan.category === category);
      this.cdRef.detectChanges();

    });
  }
  
  ngOnInit(): void {
    const category = this.route.snapshot.data['category'];
    if (category) {
      this.filterArtisansByCategory(category);
    }
  }
  
}
