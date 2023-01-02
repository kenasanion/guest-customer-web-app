import { AfterViewInit, Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { IsLoadingService } from '@service-work/is-loading';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  isLoading: boolean = false;

  constructor(private _router: Router, private _isLoadingService: IsLoadingService) {
  }

  ngAfterViewInit(): void {
    this._isLoadingService.isLoading$().subscribe((value) => {
      Promise.resolve(null).then(() =>  this.isLoading = value);
    });
    this._router.events
      .pipe(
        filter(
          event =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError,
        ),
      )
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this._isLoadingService.add();
          return;
        }

        this._isLoadingService.remove();
      });
  }
}
