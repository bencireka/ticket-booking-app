import {Component} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {FormGroup} from "@angular/forms";
import {Location} from "@angular/common";
import {AuthService} from "../../shared/services/auth.service";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm = this.createForm();

  constructor(private router: Router,
              private location: Location,
              private authService: AuthService,
              private userService: UserService) {
  }

  createForm(){
    let formGroup = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      rePassword: new FormControl(''),
      name: new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl('')
      })
    });
    formGroup.get('email')?.addValidators([Validators.required]);
    formGroup.get('password')?.addValidators([Validators.required, Validators.minLength(10)]);
    formGroup.get('rePassword')?.addValidators([Validators.required, Validators.minLength(10)]);
    formGroup.get('name')?.get('firstName')?.addValidators([Validators.required]);
    formGroup.get('name')?.get('lastName')?.addValidators([Validators.required]);

    return formGroup;
  }

  onSubmit() {
    console.log(this.signUpForm.value)
    this.authService.signup(this.signUpForm.get('email')?.value, this.signUpForm.get('password')?.value).then(cred => {
      console.log(cred);
      const user: User = {
        id:cred.user?.uid as string,
        email: this.signUpForm.get("email")?.value as string,
        username: this.signUpForm.get("email")?.value?.split('@')[0] as string,
        name: {
          firstname: this.signUpForm.get("name.firstName")?.value as string,
          lastname: this.signUpForm.get("name.lastName")?.value as string
        }
      };
      this.userService.create(user).then(_ => {
        console.log("user added successfully");
        this.router.navigateByUrl('/main');
      }).catch(error => {
        console.log(error)
      })
    }).catch(error => {
      console.log(error);
    });
  }

  goBack() {
    this.location.back();
  }

}
