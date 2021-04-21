import { Restaurant } from "./restaurant/restaurant.model";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import {MEAT_API} from '../app.api'
import {ErrorHadler} from '../app-error'
import { Observable } from "rxjs/Observable";
import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";

@Injectable()

export class RestaurantService {
    constructor(
      private http: Http
    ){}

    restaurants(): Observable<Restaurant[]> {
        return this.http.get(`${MEAT_API}/restaurants`)
        .map(response => response.json())
        .catch(ErrorHadler.handleError)
    }

    restaurantById(id: string): Observable<Restaurant> {
      return this.http.get(`${MEAT_API}/restaurants/${id}`)
      .map(response => response.json())
      .catch(ErrorHadler.handleError)
    }

    reviewsOfRestaurant(id:string): Observable<Restaurant> {
      return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
                    .map(response=> response.json())
                    .catch(ErrorHadler.handleError)
    }

    menuOfRestaurant(id: string): Observable<MenuItem[]> {
      return this.http.get(`${MEAT_API}/restaurants/${id}/menu`)
      .map(response=> response.json())
      .catch(ErrorHadler.handleError)
    }
}