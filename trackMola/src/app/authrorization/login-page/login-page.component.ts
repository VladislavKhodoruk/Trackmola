import { Observable } from 'rxjs';
import { loginStart } from './../store/authrorization.actions';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TrackMolaState } from 'src/app/store/trackMola.state';
import { User } from '../../common/interfaces';
import { loading } from 'src/app/store/common.actions';
import { getErrorMessage, getLoading } from 'src/app/store/common.selectors';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  loading!: Observable<boolean>;
  errorMessage!: Observable<string>;

  constructor(private store: Store<TrackMolaState>) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.minLength(8),
        Validators.required,
      ]),
    });
    this.loading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage);
  }
  submit(): void {
    if (this.form.invalid) {
      return;
    }
    const formValues: User = this.form.value;
    const email = formValues.email;
    const password = formValues.password;
    this.store.dispatch(loading({ status: true }));
    this.store.dispatch(loginStart({ email, password }));
  }
}
