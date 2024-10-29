import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('scrollWrapper', { read: ElementRef }) scrollWrapper!: ElementRef;

  isDown = false;
  startX = 0;
  scrollLeft = 0;

  ngAfterViewInit() {
    const wrapper = this.scrollWrapper.nativeElement;

    wrapper.addEventListener('mousedown', (e: MouseEvent) => {
      this.isDown = true;
      wrapper.classList.add('active');
      this.startX = e.pageX - wrapper.offsetLeft;
      this.scrollLeft = wrapper.scrollLeft;
    });

    wrapper.addEventListener('mouseleave', () => {
      this.isDown = false;
      wrapper.classList.remove('active');
    });

    wrapper.addEventListener('mouseup', () => {
      this.isDown = false;
      wrapper.classList.remove('active');
    });

    wrapper.addEventListener('mousemove', (e: MouseEvent) => {
      if (!this.isDown) return;
      e.preventDefault();
      const x = e.pageX - wrapper.offsetLeft;
      const walk = (x - this.startX) * 2; // Adjust scroll speed
      wrapper.scrollLeft = this.scrollLeft - walk;
    });

    // For mobile touch events
    wrapper.addEventListener('touchstart', (e: TouchEvent) => {
      this.isDown = true;
      wrapper.classList.add('active');
      this.startX = e.touches[0].pageX - wrapper.offsetLeft;
      this.scrollLeft = wrapper.scrollLeft;
    });

    wrapper.addEventListener('touchend', () => {
      this.isDown = false;
      wrapper.classList.remove('active');
    });

    wrapper.addEventListener('touchmove', (e: TouchEvent) => {
      if (!this.isDown) return;
      const x = e.touches[0].pageX - wrapper.offsetLeft;
      const walk = (x - this.startX) * 2;
      wrapper.scrollLeft = this.scrollLeft - walk;
    });
  }
}



// import { Component, ElementRef, ViewChild } from '@angular/core';

// @Component({
//   selector: 'app-carousel',
//   templateUrl: './carousel.component.html',
//   styleUrls: ['./carousel.component.css']
// })
// export class CarouselComponent {
//   @ViewChild('scrollWrapper', { read: ElementRef }) scrollWrapper!: ElementRef;

//   scrollLeft() {
//     this.scrollWrapper.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
//   }

//   scrollRight() {
//     this.scrollWrapper.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
//   }
// }
