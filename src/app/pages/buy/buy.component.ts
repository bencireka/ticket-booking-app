import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TheatrePlayService} from "../../shared/services/theatre-play.service";
import {TheatrePlay} from "../../shared/models/TheatrePlay";
import {FormControl} from "@angular/forms";
import {TheatreService} from "../../shared/services/theatre.service";

export interface ISeatInfo { id: string | undefined; price: number | undefined; row: number | undefined, seatNum: number | undefined; sector: string | undefined}
export interface IImage {ulr: string | undefined, data: any}

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit{

  theatrePlay: TheatrePlay;
  loadedImage: IImage;

  ticketsInfo: Array<ISeatInfo> = [];

  selectedTicket = new FormControl('');

  constructor(private router: Router,
              private route: ActivatedRoute,
              private theatrePlayService: TheatrePlayService,
              private theatreService: TheatreService) {
  }

  ngOnInit() {
    let id = this.route.snapshot.queryParamMap.get('id') as string;
    this.theatrePlayService.getPlayById(id).subscribe(play => {
      if(play){
        this.theatrePlay=play as TheatrePlay;
        this.loadImageFunction(this.theatrePlay.imageId);
        let theatreId = this.theatrePlay?.theatreId as string
        let availableSeats = this.theatrePlay?.availableTickets as Array<string>;
        this.theatreService.getTheatreById(theatreId).subscribe(data => {
          if(data?.seats){
            for(let seat of data.seats){
              if(availableSeats.indexOf(seat.id) != -1){
                this.ticketsInfo.push({id: seat.id, price:seat.price, row: seat.row, seatNum: seat.seatNum, sector:seat.sector});
              }
            }
          }
        });
      }
    });
  }

  loadImageFunction(imageUrl: string | undefined ){
    if (imageUrl){
      this.theatrePlayService.loadImage(imageUrl).subscribe(data => {
        this.loadedImage = {ulr:imageUrl, data:data}
      });
    }
  }

  onSubmit(){
    if(this.selectedTicket.value!=''){
      this.router.navigate(['successful'], {queryParams:{playId:this.theatrePlay.id, ticketId:this.selectedTicket.value}});
      let index = this.theatrePlay.availableTickets.indexOf(this.selectedTicket.value as string);
      if(index!=-1){
        this.theatrePlay.availableTickets.splice(index, 1);
        this.theatrePlayService.update(this.theatrePlay).then(_ => {
        }).catch(err => {
          console.log(err);
        });
      }
    }
  }
}
