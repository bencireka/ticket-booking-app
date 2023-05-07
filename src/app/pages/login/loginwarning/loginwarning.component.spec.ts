import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginwarningComponent } from './loginwarning.component';

describe('LoginwarningComponent', () => {
  let component: LoginwarningComponent;
  let fixture: ComponentFixture<LoginwarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginwarningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginwarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
