import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {Review} from "../../shared/models/Review";
import {ReviewService} from "../../shared/services/review.service";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/User";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  comments: Array<any> = [];

  user?:User

  commentsForm = this.createForm({
    id: '',
    username: '',
    rating: 0,
    date: 0
  });

  ratings = [1,2,3,4,5];

  constructor(private fb: FormBuilder,
              private router: Router,
              private reviewService: ReviewService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data =>{
      this.user = data;
      this.commentsForm.get('username')?.setValue(this.user?.username as string);
    }, error => {
      console.error(error);
    });
    this.reviewService.getAll().subscribe(comments => {
      this.comments = comments;
    });
  }

  ngOnChanges(): void {
    this.reviewService.getAll().subscribe(comments => {
      this.comments = comments;
    });

  }

  createForm(model: Review) {
    let formGroup = this.fb.group(model);
    formGroup.get('username')?.addValidators([Validators.required]);
    formGroup.get('rating')?.addValidators([Validators.required]);
    return formGroup;
  }

  addComment() {
    if (this.commentsForm.valid) {
      if (this.commentsForm.get('username') && this.commentsForm.get('rating')) {
        this.commentsForm.get('date')?.setValue(new Date().getTime());
        this.reviewService.create(this.commentsForm.value as Review).then(_=>{
          console.log("Comment successfully added!")
        }).catch(error => {
          console.error(error);
        });
      }
    }
  }

  redirectToSearch(){
    this.router.navigateByUrl('/search');
  }
}
