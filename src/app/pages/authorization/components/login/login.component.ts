import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthorizationForm } from '@pages/authorization/interfaces/interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Input() loading!: boolean | null;
  @Input() errorMessage!: string | null;

  @Output() startLoading = new EventEmitter<void>();
  @Output() loginStart = new EventEmitter<AuthorizationForm>();
  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.minLength(8),
        Validators.required,
      ]),
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    const formValues: AuthorizationForm = this.form.value;
    const email = formValues.email;
    const password = formValues.password;
    this.startLoading.emit();
    this.loginStart.emit({ email, password });
  }
}
