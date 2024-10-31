import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    private isMenuActiveSubject = new BehaviorSubject<boolean>(false);
    isMenuActive$ = this.isMenuActiveSubject.asObservable();

    toggleMenu() {
        this.isMenuActiveSubject.next(!this.isMenuActiveSubject.value);
    }

    getMenuStatus(): boolean {
        return this.isMenuActiveSubject.value;
    }
}
