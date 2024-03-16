import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtisansService } from '../artisans.service';
import { Artisan } from '../artisan.model';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from '../search.service';
import { OpinionPipe } from '../opinion.pipe';

@Component({
  selector: 'app-artisan',
  standalone: true,
  imports: [CommonModule, OpinionPipe],
  templateUrl: './artisan.component.html',
  styleUrl: './artisan.component.css',
})
export class ArtisanComponent implements OnInit {
  location: any = '../assets/location.png';
  search: any = '../assets/search.png';
  halfStar: any = '../assets/half-star.png';
  favicon: any = '../assets/favicon.png';
  @Input() id: number = 0;
  artisans!: Artisan[];
  sortedArtisans!: Artisan[];
  selectedCategory: string = '';
  searchTerm: string = '';
  category!: string;
  private searchSubscription: Subscription;
  artisan: Artisan | undefined;

  constructor(
    private artisanService: ArtisansService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private searchService: SearchService,
  ) {
    this.searchSubscription = this.searchService.searchTerm$.subscribe(
      (term) => {
        this.searchTerm = term;
        this.searchArt();
      },
    );
    this.artisanService.getArtisans().subscribe((artisans) => {
      this.artisans = artisans;
      this.sortedArtisans = [...this.artisans];
    });
  }

  // function allowing you to display the artisans sought according to their name, their city or their profession
  searchArt(): void {
    if (!this.artisans) {
      return;
    }
    this.sortedArtisans = this.artisans.filter(
      (artisan) =>
        artisan.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        artisan.specialty
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        artisan.location.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }

  //Function to destroy an observable
  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  // function allowing you to display the artisans sought according to their name, their city or their profession

  searchArtisans(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.searchTerm = target.value.toLowerCase();
    this.sortedArtisans = this.artisans.filter(
      (artisan) =>
        artisan.name.toLowerCase().includes(this.searchTerm) ||
        artisan.specialty.toLowerCase().includes(this.searchTerm) ||
        artisan.location.toLowerCase().includes(this.searchTerm),
    );
  }

  //Function reacting to the select tag and which, depending on the user's action, calls the filterArtisansByCategory function
  sortArtisans(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedCategory = target.value;
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

  //Function to sort artisans according to their category
  filterArtisansByCategory(category: string): void {
    this.artisanService.getArtisans().subscribe((artisans) => {
      this.sortedArtisans = artisans.filter(
        (artisan) => artisan.category === category,
      );
      this.cdRef.detectChanges();
    });
  }

  //Function allowing you to retrieve the category of the URL and display the artisans in this category using the filterArtisansByCategory function
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
