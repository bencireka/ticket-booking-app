import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {createFormatDiagnosticHost} from "@angular/cdk/schematics/update-tool/utils/virtual-host";
import {AuthService} from "../../shared/services/auth.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {LoginwarningComponent} from "./loginwarning/loginwarning.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email = new FormControl('', Validators.required);
  password = new FormControl('',[Validators.required, Validators.minLength(10)]);

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService, private dialog: MatDialog) {
  }

  openDialog(title: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: title
    };

    this.dialog.open(LoginwarningComponent, dialogConfig);
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe()
  }

  ngOnInit(): void {
  }

  async login() {
    this.loading = true;

    this.authService.login(this.email.value, this.password.value).then(cred => {
      this.router.navigateByUrl('/main');
      this.loading=false;
    }).catch(error =>{
      this.openDialog(error.title);
      console.error(error);
      this.loading=false;
    });
  }

  redirectToSignup(){
    this.router.navigateByUrl('/signup');
  }

}
