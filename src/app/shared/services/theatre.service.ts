import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Theatre} from "../models/Theatre";

@Injectable({
  providedIn: 'root'
})
export class TheatreService {
  collectionName = "Theatres"

  NAGY_MAX = 524;
  KIS_MAX = 180;

  constructor(private afs: AngularFirestore) { }

  initKicsi(){
    let seats : { id: string, sector: string, row: number, seatNum: number, price: number }[] = [];
    for (let i=1; i<=6; i++){
      for (let j=1; j<=10; j++){
        let seat = {
          id : this.afs.createId(),
          sector : (j<7)?"BAL Földszint1":"JOBB Földszint1",
          row : i,
          seatNum : (j<=5)?j:(11-j),
          price: (i<2)?4000:3600
        };
        seats.push(seat);
      }
    }
    for (let i=1; i<=10; i++){
      for (let j=1; j<=12; j++){
        let seat = {
          id : this.afs.createId(),
          sector : (j<7)?"BAL Földszint2":"JOBB Földszint2",
          row : i,
          seatNum : (j<=6)?j:(13-j),
          price : (i<6)?3200:2800
        };
        seats.push(seat);
      }
    }

    const theatre: Theatre = {
      id : "KISSZÍNHÁZ",
      maxCapacity : this.KIS_MAX,
      seats : seats
    };

    this.create(theatre).then(_ => {
      console.log("theatre added successfully");
    }).catch(error => {
      console.log(error)
    });
  }

  initNagy(){
    let seats : { id: string, sector: string, row: number, seatNum: number, price: number }[] = [];

    for (let i=1; i<=7; i++){
      for (let j=1; j<=12; j++){
        let seat = {
          id : this.afs.createId(),
          sector : (j<7)?"BAL Földszint1":"JOBB Földszint1",
          row : i,
          seatNum : (j<7)?j:(13-j),
          price : (i<4)?4800:4400
        };
        seats.push(seat);
      }
    }

    for (let i=1; i<=12; i++){
      for (let j=1; j<=13; j++){
        let seat = {
          id : this.afs.createId(),
          sector : (j<8)?"BAL Földszint2":"JOBB Földszint2",
          row : i,
          seatNum : (j<8)?j:(14-j),
          price : (i<6)?4000:3600
        };
        seats.push(seat);
      }
    }
    for (let i=1; i<=5; i++){
      for (let j=1; j<=12; j++){
        let seat = {
          id : this.afs.createId(),
          sector : (j<7)?"BAL Emelet":"JOBB Emelet",
          row : i,
          seatNum : (j<7)?j:(13-j),
          price : (i<4)?4800:4400
        };
        seats.push(seat);
      }
    }
    for (let i=1; i<=4; i++){
      for (let j=1; j<=6; j++){
        let sector;
        if(i>2 && j>3){
          sector="BAL Erkély páholy2";
        }else if (i>2 && j<=3){
          sector="BAL Erkély páholy1";
        }else if (i<=2 && j>3) {
          sector = "BAL Emeleti páholy2";
        }else{
          sector = "BAL Emeleti páholy1";
        }
        let seatNum;
        if(i%2!=0 && j<=3){
          seatNum=j;
        }else if(i%2!=0 && j>3){
          seatNum=j-3;
        }else if(i%2==0 && j<=3){
          seatNum=j+3;
        }else{
          seatNum=j;
        }
        let seat = {
          id : this.afs.createId(),
          sector : sector,
          row : i,
          seatNum : seatNum,
          price : (j<=3)?2400:3200
        };
        seats.push(seat);
      }
    }
    for (let i=1; i<=4; i++){
      for (let j=1; j<=6; j++){
        let sector;
        if(i>2 && j>3){
          sector="JOBB Emeleti páholy2";
        }else if (i>2 && j<=3){
          sector="JOBB Emeleti páholy1";
        }else if (i<=2 && j>3) {
          sector = "JOBB Erkély páholy2";
        }else{
          sector = "JOBB Erkély páholy1";
        }
        let seatNum;
        if(i%2!=0 && j<=3){
          seatNum=j;
        }else if(i%2!=0 && j>3){
          seatNum=j-3;
        }else if(i%2==0 && j<=3){
          seatNum=j+3;
        }else{
          seatNum=j;
        }
        let seat = {
          id : this.afs.createId(),
          sector : sector,
          row : i,
          seatNum : seatNum,
          price : (j<=3)?2400:3200
        };
        seats.push(seat);
      }
    }
    for (let i=1; i<=5; i++){
      for (let j=1; j<=8; j++){
        let seat = {
          id : this.afs.createId(),
          sector : "BAL Emelet",
          row : i,
          seatNum : j,
          price : (j<=4 && i>3)?4400:2400
        };
        seats.push(seat);
      }
    }
    for (let i=1; i<=5; i++){
      for (let j=1; j<=8; j++){
        let seat = {
          id : this.afs.createId(),
          sector : "JOBB Emelet",
          row : i,
          seatNum : j,
          price : (j<=4 && i<3)?4400:2400
        };
        seats.push(seat);
      }
    }
    for (let i=1; i<=8; i++){
      for (let j=1; j<=12; j++){
        let seat = {
          id : this.afs.createId(),
          sector : (j<7)?"BAL Szemközti Emelet":"JOBB Szemközti Emelet",
          row : i,
          seatNum : (j<7)?j:(13-j),
          price : (i<4)?4800:4000
        };
        seats.push(seat);
      }
    }

    const theatre: Theatre =  {
      id: "NAGYSZÍNHÁZ",
      maxCapacity: this.NAGY_MAX,
      seats: seats
    };

    this.create(theatre).then(_ => {
      console.log("theatre added successfully");
    }).catch(error => {
      console.log(error)
    });
  }

  create(theatre: Theatre) {
    return this.afs.collection<Theatre>(this.collectionName).doc(theatre.id).set(theatre);
  }

  getAll(){
    return this.afs.collection<Theatre>(this.collectionName).valueChanges();
  }

  getTheatreById(id: string){
    return this.afs.collection<Theatre>(this.collectionName).doc(id).valueChanges();
  }

  update(theatre: Theatre){
    return this.afs.collection<Theatre>(this.collectionName).doc(theatre.id).set(theatre);
  }

  delete(id: string){
    return this.afs.collection<Theatre>(this.collectionName).doc(id).delete();
  }
}
