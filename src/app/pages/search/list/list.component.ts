import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TheatrePlayService} from "../../../shared/services/theatre-play.service";
import {TheatrePlay} from "../../../shared/models/TheatrePlay";

export interface ISearchResults { title: string | undefined; date: Date | undefined, theatreId: string | undefined}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges{
  @Input() searchInput?: ISearchResults;

  theatrePlays: Array<TheatrePlay> = [];
  loadedImages: Map<string | undefined, any> = new Map<string | undefined, any>();

  constructor(private router: Router, private theatrePlayService: TheatrePlayService) {
  }

  ngOnInit(): void {
    this.theatrePlayService.getAll().subscribe((plays:Array<TheatrePlay>) => {
      this.theatrePlays=plays;
      for(let play of this.theatrePlays){
        if(play){
          this.loadImageFunction(play.imageId);
        }
      }
    });
  }

  ngOnChanges(){
    if(this.searchInput){
      this.theatrePlayService.getTheatrePlaysBySearch(this.searchInput).subscribe(data =>{
        this.theatrePlays = data;
      });
    }
  }

  loadImageFunction(imageUrl: string | undefined ){
    if (imageUrl){
      this.theatrePlayService.loadImage(imageUrl).subscribe(data => {
        this.loadedImages.set(imageUrl, data);
      });
    }
  }

  buyTicket(playId:string){
    this.router.navigate(['/buy'], {queryParams:{id:playId}});
  }

}
