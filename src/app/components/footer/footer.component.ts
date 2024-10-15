
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Show/hide the "Back to Top" button based on scroll position
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollButton = document.getElementById('backToTopButton');

    if (scrollButton) {
      if (scrollTop > 300) {
        scrollButton.style.display = 'block';
      } else {
        scrollButton.style.display = 'none';
      }
    }
  }

  scrollToTop() {
    // Scroll to the top of the page when the button is clicked
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


}