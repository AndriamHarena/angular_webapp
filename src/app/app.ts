import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { MainContentComponent } from './components/main-content/main-content.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, MainContentComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-webapp');
}
