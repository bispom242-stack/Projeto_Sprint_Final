import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formLogin: FormGroup;
  loading = false;
  errorMsg = '';
  showPassword = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.formLogin = this.fb.group({
      nome: ['', Validators.required],
      senha: ['', Validators.required],
      auto: [false],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.formLogin.invalid) return;

    this.loading = true;
    this.errorMsg = '';

    const body = {
      nome: this.formLogin.value.nome,
      senha: this.formLogin.value.senha,
    };

    this.http.post('http://localhost:3001/login', body).subscribe({
      next: (res: any) => {
        console.log('Login realizado:', res);

        if (this.formLogin.value.auto) {
          localStorage.setItem('autologin', JSON.stringify(res));
        }

        this.loading = false;
        this.router.navigate(['/home']); 
      },
      error: (err) => {
        this.loading = false;

        this.errorMsg = err.error?.message || 'Erro desconhecido';
      },
    });
  }
}
