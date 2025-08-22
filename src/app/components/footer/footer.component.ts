import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  newsletterEmail: string = '';
  currentYear: number = new Date().getFullYear();

  onNewsletterSubmit() {
    if (this.newsletterEmail) {
      console.log('Newsletter subscription for:', this.newsletterEmail);
      // Here you would typically call a service to handle the subscription
      alert('Merci pour votre inscription à notre newsletter !');
      this.newsletterEmail = '';
    }
  }
}
