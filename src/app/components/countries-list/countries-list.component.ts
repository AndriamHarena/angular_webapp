import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export interface Country {
  name: string;
  capital: string;
  population: number;
  region: string;
  flag?: string;
}

// V1 - Hardcoded data
export const COUNTRIES: Country[] = [
  { name: 'France', capital: 'Paris', population: 67000000, region: 'Europe' },
  { name: 'Japan', capital: 'Tokyo', population: 125000000, region: 'Asia' },
  { name: 'Brazil', capital: 'Brasília', population: 213000000, region: 'Americas' },
];

@Component({
  selector: 'app-countries-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './countries-list.component.html',
  styleUrl: './countries-list.component.scss'
})
export class CountriesListComponent implements OnInit {
  countries: Country[] = [];
  loading = false;
  useAPI = false; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    if (this.useAPI) {
      this.loadFromAPI();
    } else {
      this.loadHardcodedData();
    }
  }

  loadHardcodedData() {
    this.countries = COUNTRIES;
  }

  loadFromAPI() {
    this.loading = true;
    this.http.get<any[]>('https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags')
      .subscribe({
        next: (data) => {
          this.countries = data.map(country => ({
            name: country.name.common,
            capital: country.capital?.[0] || 'N/A',
            population: country.population,
            region: country.region || 'N/A',
            flag: country.flags?.svg
          }));
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading countries:', error);
          this.loadHardcodedData(); 
          this.loading = false;
        }
      });
  }

  toggleDataSource() {
    this.useAPI = !this.useAPI;
    this.loadCountries();
  }
}
