import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Review} from "../models/Review";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  collectionName = "Reviews"

  constructor(private afs: AngularFirestore) { }

  create(review: Review) {
    review.id = this.afs.createId();
    return this.afs.collection<Review>(this.collectionName).doc(review.id).set(review);
  }

  getAll(){
    return this.afs.collection<Review>(this.collectionName).valueChanges();
  }

  update(review: Review){
    return this.afs.collection<Review>(this.collectionName).doc(review.id).set(review);
  }

  delete(id: string){
    return this.afs.collection<Review>(this.collectionName).doc(id).delete();
  }
}
