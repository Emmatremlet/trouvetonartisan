import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trouve-ton-artisan';
  logo: any = "../assets/logo.png";
  search: any = "../assets/search.png";
  picture: any = "../assets/Visuel-flou.jpeg";
  location: any = "../assets/location.png";
}
