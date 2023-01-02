import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'gapp-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Input() brandTitle: string = 'Guest App';

  ngOnInit(): void {
  }
}
