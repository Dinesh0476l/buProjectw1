import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  currentRoute: string = '';

  constructor(private router: Router) {
   
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  navigateTo(path: string) {
    if (this.currentRoute !== path) {
      this.router.navigate([path]);
    }
  }
}
