import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
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
