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
export class ArtisanComponent implements OnInit {
  location: any = '../assets/location.png';
  search: any = '../assets/search.png';
  favicon: any = '../assets/favicon.png';
  @Input() id: number = 0;
  artisans!: Artisan[];
  sortedArtisans!: Artisan[];
  selectedCategory: string = '';
  searchTerm: string = '';
  category!: string;

  artisan: Artisan | undefined;

  constructor(
    private artisanService: ArtisansService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
  ) {
    this.artisanService.getArtisans().subscribe((artisans) => {
      console.log(artisans);
      this.artisans = artisans;
      this.sortedArtisans = [...this.artisans];
    });
  }

  searchArtisans(event: Event) {
    console.log("On rentre dans la fonction searchArtisans");
    const target = event.target as HTMLSelectElement;
    this.searchTerm = target.value;
    this.sortedArtisans = this.artisans.filter((artisan) =>
      artisan.name.toLowerCase().includes(target.value.toLowerCase()),
    );
    this.sortedArtisans = this.artisans.filter((artisan) =>
      artisan.specialty.toLowerCase().includes(target.value.toLowerCase()),
    );
    this.sortedArtisans = this.artisans.filter((artisan) =>
      artisan.location.toLowerCase().includes(target.value.toLowerCase()),
    );
  }

  sortArtisans() {
    console.log('on rentre dans la fonction sortArtisans');
    console.log(this.selectedCategory);

    if (this.selectedCategory) {
      this.filterArtisansByCategory(this.selectedCategory);
    } else {
      this.artisanService.getArtisans().subscribe((artisans) => {
        this.artisans = artisans;
        this.sortedArtisans = [...this.artisans];
        this.cdRef.detectChanges();
      });
    }
  }

  filterArtisansByCategory(category: string): void {
    this.artisanService.getArtisans().subscribe((artisans) => {
      this.sortedArtisans = artisans.filter(
        (artisan) => artisan.category === category,
      );
      this.cdRef.detectChanges();
    });
  }

  ngOnInit(): void {
    const category = this.route.snapshot.data['category'];
    if (category) {
      this.filterArtisansByCategory(category);
    } else {
      this.artisanService.getArtisans().subscribe((artisans) => {
        this.artisans = artisans;
        this.sortedArtisans = [...this.artisans];
        this.cdRef.detectChanges();
      });
    }
  }
}
