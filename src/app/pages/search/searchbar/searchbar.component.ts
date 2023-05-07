import {Component, EventEmitter, Output} from '@angular/core';
import {TheatrePlay} from "../../../shared/models/TheatrePlay";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {TheatrePlayService} from "../../../shared/services/theatre-play.service";
import {TheatreService} from "../../../shared/services/theatre.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../shared/models/User";

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {

  @Output() theatreObjectEmitter: EventEmitter<any> = new EventEmitter<any>();

  // theatreForm = this.createTheatreForm();

  // createTheatreForm(){
  //   let formGroup = new FormGroup({
  //     title: new FormControl(''),
  //     theatreId: new FormControl(''),
  //     imageId: new FormControl(''),
  //     date: new FormControl(new Date()),
  //   });
  //   return formGroup;
  // }
  // imageIds = [
  //   "images/a-pal-utcai-fiuk-474-279-174913.jpg",
  //   "images/a_padlas.jpg",
  //   "images/carmina_burana.jpg",
  //   "images/don_giovanni_szinlapkep_3200x1250_01.jpg",
  //   "images/gyilkos_party.jpg",
  //   "images/kakukkfeszek.jpg",
  //   "images/macskafogo.jpg",
  //   "images/maria_orszaga_szinlapkep_3200x1250_01.jpg",
  //   "images/parasztopera.jpg",
  //   "images/pasik_a_pacban.jpg"
  // ]
  //
  // formTitles = [
  //   "A Pál utcai fiúk",
  //   "A padlás",
  //   "Carmina Burana",
  //   "Don Giovanni",
  //   "Gyilkos party",
  //   "Kakukkfészek",
  //   "Macskafogó",
  //   "Mária országa",
  //   "Parasztopera",
  //   "Pasik a pácban"
  // ]

  titles: Set<string> = new Set<string>;

  searchForm = this.createForm();

  createForm() {
    let formGroup = new FormGroup({
      title: new FormControl(''),
      date: new FormControl(new Date()),
      theatreId: new FormControl(''),
    });
    return formGroup;
  }

  constructor(private router: Router,
              private location: Location,
              private theatrePlayService: TheatrePlayService,
              private theatreService: TheatreService) {
  }

  ngOnInit(): void {
    this.getAllTitles();
  }

  getAllTitles() {
    this.theatrePlayService.getAll().subscribe((data: Array<TheatrePlay>) => {
      for (let play of data) {
        this.titles.add(play.title);
      }
    });
  }

  onSubmit() {
    this.theatreObjectEmitter.emit(this.searchForm.value);
  }

  // createNewPlay(){
  //   console.log(this.theatreForm.value)
  //   let availableTicketIds = new Array<string>();
  //   let theatrePlay: TheatrePlay = {
  //     id: '',
  //     title: this.theatreForm.get("title")?.value as string,
  //     date: this.theatreForm.get("date")?.value?.getTime() as number,
  //     theatreId: this.theatreForm.get("theatreId")?.value as string,
  //     imageId: this.theatreForm.get("imageId")?.value as string,
  //     availableTickets: new Array<string>()
  //   }
  //   this.theatreService.getTheatreById(theatrePlay.theatreId).subscribe(data => {
  //     if(data?.seats){
  //       for(let seat of data.seats){
  //         availableTicketIds.push(seat.id);
  //       }
  //       theatrePlay.availableTickets = availableTicketIds;
  //     }
  //     console.log(theatrePlay);
  //     this.theatrePlayService.create(theatrePlay);
  //   });
  // }

}
