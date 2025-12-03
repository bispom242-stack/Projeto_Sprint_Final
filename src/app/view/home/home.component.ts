import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterLink, RouterLinkActive, NgIf, NgFor]
})
export class HomeComponent {
  sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  images = [
    {
      src: 'img/ranger.png',
      alt: 'Ranger',
      title: 'Ranger'
    },
    {
      src: 'img/mustang.png',
      alt: 'Mustang',
      title: 'Mustang'
    },
    {
      src: 'img/broncoSport.png',
      alt: 'Bronco Sport',
      title: 'Bronco Sport'
    }
  ];
}
