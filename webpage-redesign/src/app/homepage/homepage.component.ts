import { Component, OnInit, AfterViewInit, signal } from '@angular/core';
import { IntroductionComponent } from "./introduction/introduction.component";
import { CoffeeService } from '../service/coffee.service';
import { Coffee } from '../service/coffee.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [IntroductionComponent, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, AfterViewInit {

  showElement1 = signal(true);
  showElement2 = signal(false);
  showElement3 = signal(false);


  coffeeList: Coffee[] = [];
  randomCoffeeOfTheDay: Coffee | null = null;


  constructor(private coffeeService: CoffeeService) { }

  fetchCoffee() {
    this.coffeeService.fetchCoffee()
      .subscribe({
        next: (response) => {
          this.coffeeList = response;
          this.displayRandomCoffee();
        },
        error: (error) => {
          console.error(error);
        }
      });
  }


  displayRandomCoffee() {
    this.randomCoffeeOfTheDay = this.coffeeService.getRandomCoffee(this.coffeeList);

    if (this.randomCoffeeOfTheDay && this.randomCoffeeOfTheDay.image_url) { // checking if randomCoffeeOfTheDay and image_url have data or returns null
      this.coffeeService.getImageSize(this.randomCoffeeOfTheDay.image_url)  //passing image_url to the getImageSize method from the Coffee service
        .then(size => {                                                         //.then is used to handle results of a successful promise
          if (size.width === 2000 && size.height === 1500) {
            console.log(`Image size is correct:`, size);
          } else {
            this.displayRandomCoffee()
          }
        })
        .catch(err => console.error('Error fetching image size:', err));
    }
  }


  ngOnInit() {
    console.log('Initialized');
    this.fetchCoffee();
  }

  ngAfterViewInit() {
    console.log('View initialized');
    this.initializeScrollAnimations();
  }


  initializeScrollAnimations() {
    // Select all elements with a `data-animation` attribute
    const animatedElements = document.querySelectorAll<HTMLElement>('[data-animation]');

    // Intersection Observer configuration
    const observerOptions: IntersectionObserverInit = {
      root: null, // Default: viewport
      threshold: .75 // Trigger when 10% of the element is visible
    };

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const animationType = target.dataset['animation']; // Updated to bracket notation

          if (animationType) {
            // Add the animation class dynamically
            target.classList.add(`animate-${animationType}`);
          }

          // Stop observing the element after animating
          observer.unobserve(target);
        }
      });
    };

    // Initialize the Intersection Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each animated element
    animatedElements.forEach(element => observer.observe(element));
  }


  onClick() {
    this.showElement1.set(true);
    this.showElement2.set(false);
    this.showElement3.set(false);

  }

  onClick2() {
    this.showElement1.set(false);
    this.showElement2.set(true);
    this.showElement3.set(false);

  }

  onClick3() {
    this.showElement1.set(false);
    this.showElement2.set(false);
    this.showElement3.set(true);

  }
}
