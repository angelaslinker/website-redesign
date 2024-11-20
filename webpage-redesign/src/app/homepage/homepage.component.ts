import { Component } from '@angular/core';
import { IntroductionComponent } from "./introduction/introduction.component";
import { CoffeeService } from '../service/coffee.service';
import { Coffee } from '../service/coffee.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [IntroductionComponent, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  coffeeList: Coffee[] = [];
  randomCoffeeOfTheDay: Coffee | null = null;


  constructor(private coffeeService: CoffeeService) { }

  fetchCoffee() {
    this.coffeeService.fetchCoffee()
      .subscribe({
        next: (response) => {
          this.coffeeList = response;
          this.displayRandomCoffee();
        }, error: (error) => {
          console.error(error);
        }
      });
  }

  displayRandomCoffee() {
    this.randomCoffeeOfTheDay = this.coffeeService.getRandomCoffee(this.coffeeList);
  }

  ngOnInit() {
    this.fetchCoffee();
  }



}
