import { Injectable } from '@angular/core';
import { Artisan } from './artisan.model';
import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ArtisansService {

  favicon: any = "../assets/favicon.png"

  private artisans: Artisan[] = [
    {
      id: 1,
      name: 'Artisan 1',
      job: 'Métier 1',
      category: 'Bâtiment',
      location: 'Lyon',
      image: this.favicon,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam commodo laoreet augue, et condimentum sem varius ut. Duis est est, venenatis et accumsan id, viverra et justo. Suspendisse ornare eu ligula eget auctor. Nulla nec metus vel massa egestas auctor a vitae velit. Nullam rutrum eu risus sit amet volutpat. Phasellus bibendum in massa a convallis. Maecenas vel pellentesque metus. Duis eu luctus lectus. Morbi elit nibh, euismod a tellus et, scelerisque egestas orci. Phasellus ornare ut urna et ornare. In lorem sapien, semper id sollicitudin sed, suscipit ut eros. Vivamus et ante congue, varius elit id, varius odio. Pellentesque interdum orci dictum, hendrerit orci non, pulvinar magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse sed mi nisi.',
      opinion: 4
    },
    {
      id: 2,
      name: 'Artisan 2',
      job: 'Métier 2',
      category: 'Services',
      location: 'Paris',
      image: this.favicon,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam commodo laoreet augue, et condimentum sem varius ut. Duis est est, venenatis et accumsan id, viverra et justo. Suspendisse ornare eu ligula eget auctor. Nulla nec metus vel massa egestas auctor a vitae velit. Nullam rutrum eu risus sit amet volutpat. Phasellus bibendum in massa a convallis. Maecenas vel pellentesque metus. Duis eu luctus lectus. Morbi elit nibh, euismod a tellus et, scelerisque egestas orci. Phasellus ornare ut urna et ornare. In lorem sapien, semper id sollicitudin sed, suscipit ut eros. Vivamus et ante congue, varius elit id, varius odio. Pellentesque interdum orci dictum, hendrerit orci non, pulvinar magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse sed mi nisi.',
      opinion: 4.5
    },
    {
      id: 3,
      name: 'Artisan 3',
      job: 'Métier 3',
      category: 'Fabrication',
      location: 'Marseille',
      image: this.favicon,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam commodo laoreet augue, et condimentum sem varius ut. Duis est est, venenatis et accumsan id, viverra et justo. Suspendisse ornare eu ligula eget auctor. Nulla nec metus vel massa egestas auctor a vitae velit. Nullam rutrum eu risus sit amet volutpat. Phasellus bibendum in massa a convallis. Maecenas vel pellentesque metus. Duis eu luctus lectus. Morbi elit nibh, euismod a tellus et, scelerisque egestas orci. Phasellus ornare ut urna et ornare. In lorem sapien, semper id sollicitudin sed, suscipit ut eros. Vivamus et ante congue, varius elit id, varius odio. Pellentesque interdum orci dictum, hendrerit orci non, pulvinar magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse sed mi nisi.',
      opinion: 3
    },
    {
      id: 4,
      name: 'Artisan 4',
      job: 'Métier 4',
      category: 'Alimentation',
      location: 'Bordeaux',
      image: this.favicon,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam commodo laoreet augue, et condimentum sem varius ut. Duis est est, venenatis et accumsan id, viverra et justo. Suspendisse ornare eu ligula eget auctor. Nulla nec metus vel massa egestas auctor a vitae velit. Nullam rutrum eu risus sit amet volutpat. Phasellus bibendum in massa a convallis. Maecenas vel pellentesque metus. Duis eu luctus lectus. Morbi elit nibh, euismod a tellus et, scelerisque egestas orci. Phasellus ornare ut urna et ornare. In lorem sapien, semper id sollicitudin sed, suscipit ut eros. Vivamus et ante congue, varius elit id, varius odio. Pellentesque interdum orci dictum, hendrerit orci non, pulvinar magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse sed mi nisi.',
      opinion: 3
    },
  ];

  getArtisans(): Observable<Artisan[]> {
    return of([...this.artisans]);
  }

  getArtisanByCategory(category: string): Observable<Artisan | undefined> {
    const artisan = this.artisans.find(art => art.category === category);
    return of(artisan);
  }
  
  getArtisanById(id: number): Artisan | undefined {
    return this.artisans.find(artisan => artisan.id === id);
  }
}

