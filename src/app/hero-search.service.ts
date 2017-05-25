/**
 * Created by tester on 5/25/2017.
 */

import {Http} from '@angular/http';

import {Observable} from 'rxjs/Observable';



import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import {Hero} from "./hero";



@Injectable()
export class HeroSearchService {
    constructor(private http: Http) {

    }

    search(term: string): Observable<Hero[]> {
        return this.http.get(`app/heroes/?name=${term}`).map(response => response.json().data as Hero[]);
    }
}