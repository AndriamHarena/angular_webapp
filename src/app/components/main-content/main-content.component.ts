import { Component } from '@angular/core';
import { CountriesListComponent } from '../countries-list/countries-list.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CountriesListComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
