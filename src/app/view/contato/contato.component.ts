import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-contato',
  imports: [RouterLink, RouterLinkActive, FormsModule, NgIf],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {
  sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  enviarFormulario(form: NgForm) {

    if (form.invalid) {
      // marca todos os campos para mostrar erro visual
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });

      alert('Preencha todos os campos obrigatórios e aceite os termos.');
      return;
    }

    console.log(form.value);
    alert('Formulário enviado com sucesso!');
    form.resetForm();
  }

}
