import { Injectable, signal } from '@angular/core';
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

    headerText = signal<string>('Welcome, Admin!');

    changeHeaderText(text: string) {
        this.headerText.set(text);
    }

    // New function added
    resetMenuState() {
        this.isMenuActiveSubject.next(false);
    }
}
