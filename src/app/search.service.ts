// shared/search.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

//This SearchService class provides functionality for managing search terms by providing a setSearchTerm method to update the current search term, 
//as well as a searchTerm$ observable to monitor search term changes.
export class SearchService {
  private searchTermSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  searchTerm$: Observable<string> = this.searchTermSubject.asObservable();

  constructor() {}

  setSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }
}
