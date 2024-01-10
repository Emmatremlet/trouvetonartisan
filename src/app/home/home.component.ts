import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  location: any = "../assets/location.png";
  star: any = "../assets/star.png";
  halfStar: any ="../assets/half-star.png"
  favicon: any ="../assets/favicon.png"
}
