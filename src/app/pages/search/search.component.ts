import { Component } from '@angular/core';
export interface ISearchResults { title: string | undefined; date: Date | undefined, theatreId: string | undefined}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})

export class SearchComponent {
  searchResults?: ISearchResults;

  loadSearchResults(searchResults : ISearchResults){
    this.searchResults = searchResults;
  }

}
