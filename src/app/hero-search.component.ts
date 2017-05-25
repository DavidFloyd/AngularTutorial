/**
 * Created by tester on 5/25/2017.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Subject} from 'rxjs/Subject';

import {Hero} from './hero';
import {HeroService} from './hero.service';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Observable} from "rxjs/Observable";
import {HeroSearchService} from "./hero-search.service";

@Component({
    selector: 'hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: ['./hero-search.component.css'],
    providers: [HeroService]
})

export class HeroSearchComponent implements OnInit {
    heroes: Observable<Hero[]>;
    private searchTerms = new Subject<string>();

    constructor(private heroSearchService: HeroSearchService, private  router: Router) {

    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {

        this.heroes = this.searchTerms.debounceTime(300).distinctUntilChanged()
            .switchMap(term => term ? this.heroSearchService.search(term) : Observable.of<Hero[]>([])).catch(error => {
                console.log(error);
                return Observable.of<Hero[]>([]);
            });
    }

    goToDetail(hero: Hero): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
}