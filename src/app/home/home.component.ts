import { Component } from '@angular/core';
import { ArtisansService } from '../artisans.service';
import { CommonModule } from '@angular/common';
import { Artisan } from '../artisan.model';
import { OpinionPipe } from '../opinion.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, OpinionPipe],
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

  constructor(private artisanService: ArtisansService) {}

  ngOnInit(): void {
    //Function that finds the 3 best artisans based on their rating
    this.artisanService.getArtisans().subscribe((artisans: any[]) => {
      artisans.sort((a, b) => b.note - a.note);
      this.bestArtisan = artisans[0];
      this.secondArtisan = artisans[1];
      this.thirdArtisan = artisans[2];
    });
  }
}
