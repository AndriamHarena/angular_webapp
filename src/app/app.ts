import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { ContentComponent } from './components/content/content.component';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, ContentComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-webapp');
}
