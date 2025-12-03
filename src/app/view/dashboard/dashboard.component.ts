import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [NgFor, NgIf, ReactiveFormsModule, RouterLink, RouterLinkActive]
})
export class DashboardComponent implements OnInit {
  sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  vehicles: any[] = [];
  selectedVehicle: any = null;

  salesTotal: number = 0;
  connectedTotal: number = 0;
  updateTotal: number = 0;

  carImage: string = '';

  vinInput = new FormControl('');
  vinData: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadVehicles();

    this.vinInput.valueChanges.subscribe(vin => {
      if (vin && vin.length > 5) {
        this.loadVinData(vin);
      }
    });
  }

  loadVehicles() {
    this.http.get<any>('http://localhost:3001/vehicles').subscribe({
      next: (res) => {
        this.vehicles = res.vehicles;

        // Se existe pelo menos um veículo
        if (this.vehicles.length > 0) {

          const first = this.vehicles[0];
          this.selectedVehicle = first.vehicle;

          // Carrega automaticamente os dados do primeiro item
          this.fillVehicleData(first.vehicle);
        }
      },
      error: () => alert('Erro ao carregar veículos!')
    });
  }

  fillVehicleData(vehicleName: string) {
    const v = this.vehicles.find(x => x.vehicle === vehicleName);
    if (!v) return;

    this.salesTotal = v.volumetotal;
    this.connectedTotal = v.connected;
    this.updateTotal = v.softwareUpdates;
    this.carImage = v.img;
  }


  onVehicleChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.fillVehicleData(value);
  }

  loadVinData(vin: string) {
    this.http.post<any>('http://localhost:3001/vehicleData', { vin }).subscribe({
      next: (res) => this.vinData = res,
      error: () => this.vinData = null
    });
  }
}
