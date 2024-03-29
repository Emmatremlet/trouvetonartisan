import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artisan } from './artisan.model';

@Injectable({
  providedIn: 'root',
})

//Service to use API data
export class ArtisansService {
  private apiUrl = '../assets/API/datas.json';

  constructor(private http: HttpClient) {}

  getArtisans(): Observable<Artisan[]> {
    return this.http.get<Artisan[]>(`${this.apiUrl}`);
  }
}
