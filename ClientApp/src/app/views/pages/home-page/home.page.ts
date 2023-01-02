import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppContent } from 'src/app/app.resources';

@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  content = AppContent;

  constructor(private _router: Router) {

  }

  ngOnInit(): void {
  }
}
