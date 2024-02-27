import { Component } from '@angular/core';
import { ArtisansService } from '../artisans.service';
import { CommonModule } from '@angular/common';
import { Artisan } from '../artisan.model';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  location: any = '../assets/location.png';
  favicon: any = '../assets/favicon.png';
  halfStar: any = '../assets/half-star.png';
  artisans!: Artisan[];
  bestArtisan: any;
  secondArtisan: any;
  thirdArtisan: any;
  stars1: any;
  fullnote1: any[] = [];
  halfnote1: any[] = [];
  halfStars1: any;
  decimal1: any;
  stars2: any;
  fullnote2: any[] = [];
  halfnote2: any[] = [];
  halfStars2: any;
  decimal2: any;
  stars3: any;
  fullnote3: any[] = [];
  halfnote3: any[] = [];
  halfStars3: any;
  decimal3: any;

  constructor(private artisanService: ArtisansService) { }

  ngOnInit(): void {
    this.artisanService.getArtisans().subscribe((artisans: any[]) => {
      artisans.sort((a, b) => b.note - a.note);
      this.bestArtisan = artisans[0];
      this.secondArtisan = artisans[1];
      this.thirdArtisan = artisans[2];
    });
    if (this.bestArtisan && this.bestArtisan.note) {
      this.stars1 = Math.floor(this.bestArtisan.note);
      this.decimal1 = this.bestArtisan.note - Math.floor(this.bestArtisan.note);

      if (this.decimal1 != 0) {
        this.halfStars1 = 1;
      }
      this.fullnote1 = Array(this.stars1).fill(0);
      this.halfnote1 = Array(this.halfStars1).fill(0);
    }

    if (this.secondArtisan && this.secondArtisan.note) {
      this.stars2 = Math.floor(this.secondArtisan.note);
      this.decimal2 = this.bestArtisan.note - Math.floor(this.bestArtisan.note);

      if (this.decimal2 != 0) {
        this.halfStars2 = 1;
      }
      this.fullnote2 = Array(this.stars2).fill(0);
      this.halfnote2 = Array(this.halfStars2).fill(0);
    }

    if (this.thirdArtisan && this.thirdArtisan.note) {
      this.stars3 = Math.floor(this.thirdArtisan.note);
      this.decimal3 =
        this.thirdArtisan.note - Math.floor(this.thirdArtisan.note);

      if (this.decimal3 != 0) {
        this.halfStars3 = 1;
      }
      this.fullnote3 = Array(this.stars3).fill(0);
      this.halfnote3 = Array(this.halfStars3).fill(0);
    }
  }
}
