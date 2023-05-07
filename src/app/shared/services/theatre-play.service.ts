import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {TheatrePlay} from "../models/TheatrePlay";
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {equalTo} from "@angular/fire/database";

export interface ISearchResults { title: string | undefined; date: Date | undefined, theatreId: string | undefined}

@Injectable({
  providedIn: 'root'
})
export class TheatrePlayService {

  collectionName = "TheatrePlays"

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

  create(theatrePlay: TheatrePlay) {
    theatrePlay.id = this.afs.createId();
    return this.afs.collection<TheatrePlay>(this.collectionName).doc(theatrePlay.id).set(theatrePlay);
  }

  getAll(): Observable<Array<TheatrePlay>>{
    return this.afs.collection<TheatrePlay>(this.collectionName).valueChanges();
  }

  getPlayById(id: string){
    return this.afs.collection<TheatrePlay>(this.collectionName).doc(id).valueChanges();
  }

  getTheatrePlaysBySearch(searchResults: ISearchResults){
    if(searchResults.title && searchResults.theatreId){
      return this.afs.collection<TheatrePlay>(this.collectionName, ref => ref.where("title", '==', searchResults.title).where('date', '>=', searchResults.date?.getTime()).where('theatreId', '==', searchResults.theatreId).orderBy('date', "asc")).valueChanges();
    }else if(searchResults.title && !searchResults.theatreId){
      return this.afs.collection<TheatrePlay>(this.collectionName, ref => ref.where('title', '==', searchResults.title).where('date', '>=', searchResults.date?.getTime()).orderBy('date', "asc")).valueChanges();
    }else if(!searchResults.title && searchResults.theatreId){
      return this.afs.collection<TheatrePlay>(this.collectionName, ref => ref.where('theatreId', '==', searchResults.theatreId).where('date', '>=', searchResults.date?.getTime()).orderBy('date', "asc")).valueChanges();
    }else if(!searchResults.title && !searchResults.theatreId) {
      return this.afs.collection<TheatrePlay>(this.collectionName, ref => ref.where('date', '>=', searchResults.date?.getTime()).orderBy('date', "asc")).valueChanges();
    }else{
      return this.getAll();
    }
  }

  update(theatrePlay: TheatrePlay){
    return this.afs.collection<TheatrePlay>(this.collectionName).doc(theatrePlay.id).set(theatrePlay);
  }

  delete(id: string){
    return this.afs.collection<TheatrePlay>(this.collectionName).doc(id).delete();
  }

  loadImage(imageUrl: string){
    return this.storage.ref(imageUrl).getDownloadURL();
  }

}
