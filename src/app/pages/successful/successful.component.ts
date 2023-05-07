import { Component } from '@angular/core';
import {TheatrePlay} from "../../shared/models/TheatrePlay";
import {ActivatedRoute} from "@angular/router";
import {TheatrePlayService} from "../../shared/services/theatre-play.service";
import {TheatreService} from "../../shared/services/theatre.service";

export interface ISeatInfo { id: string | undefined; price: number | undefined; row: number | undefined, seatNum: number | undefined; sector: string | undefined}

@Component({
  selector: 'app-successful',
  templateUrl: './successful.component.html',
  styleUrls: ['./successful.component.scss']
})
export class SuccessfulComponent {
  ticketsInfo: ISeatInfo;
  theatrePlay: TheatrePlay;

  constructor(private route: ActivatedRoute, private theatrePlayService: TheatrePlayService, private theatreService: TheatreService) {
  }

  ngOnInit(){
    let theatreId = this.route.snapshot.queryParamMap.get('playId') as string;
    let ticketId = this.route.snapshot.queryParamMap.get('ticketId') as string;
    this.theatrePlayService.getPlayById(theatreId).subscribe(play => {
      this.theatrePlay=play as TheatrePlay;
      let theatreId = this.theatrePlay?.theatreId as string
      this.theatreService.getTheatreById(theatreId).subscribe(data => {
        if(data?.seats){
          for(let seat of data?.seats){
            if(seat.id == ticketId){
              this.ticketsInfo = {id:seat.id, sector:seat.sector, row:seat.row, seatNum: seat.seatNum, price: seat.price};
              return;
            }
          }
        }
      });
    });
  }
}
