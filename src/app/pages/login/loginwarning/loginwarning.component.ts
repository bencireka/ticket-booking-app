import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-loginwarning',
  templateUrl: './loginwarning.component.html',
  styleUrls: ['./loginwarning.component.scss']
})
export class LoginwarningComponent {

  description:string;

  constructor(private dialogRef: MatDialogRef<LoginwarningComponent>){
  }

  close() {
    this.dialogRef.close();
  }
}
