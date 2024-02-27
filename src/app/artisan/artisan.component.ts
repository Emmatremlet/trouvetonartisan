import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtisansService } from '../artisans.service';
import { Artisan } from '../artisan.model';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from '../search.service';

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

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

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

  filterArtisansByCategory(category: string): void {
    this.artisanService.getArtisans().subscribe((artisans) => {
      this.sortedArtisans = artisans.filter(
        (artisan) => artisan.category === category,
      );
      this.cdRef.detectChanges();
    });
  }

  opinion(artisan: any) {
    let wholePart = Math.floor(artisan.note);
    let decimal = artisan.note - wholePart;
    let halfPart = 0;
    let empty = 0;
    if (decimal != 0) {
      halfPart = 1;
    }

    if (halfPart + wholePart != 5) {
      empty = 5 - (halfPart + wholePart);
    }
    const fullnote = Array(wholePart).fill(0);
    const halfnote = Array(halfPart).fill(0);
    const emptynote = Array(empty).fill(0);

    const note = [fullnote, halfnote, emptynote];

    return note;
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
