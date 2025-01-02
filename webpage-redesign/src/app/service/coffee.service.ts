
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Coffee {
    id: number;
    name: string;
    description: string;
    flavor_profile: string;
    price: number;
    image_url: string;
}


@Injectable({ //Injectable decorator indicates that this service will be injected into other components
    providedIn: 'root'
})
export class CoffeeService {
    private apiUrl = "https://fake-coffee-api.vercel.app/api";

    constructor(private http: HttpClient) { }

    fetchCoffee(): Observable<Coffee[]> {
        return this.http.get<Coffee[]>(this.apiUrl);
    }

    getRandomCoffee(coffeeList: Coffee[]): Coffee | null {
        if (coffeeList.length === 0) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * coffeeList.length);
        return coffeeList[randomIndex];

    }

}

