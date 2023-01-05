import { Component } from '@angular/core';
import { AppContent } from 'src/app/app.resources';

@Component({
  selector: 'guest-benefits-list',
  templateUrl: './guest-benefits-list.component.html',
  styleUrls: ['./guest-benefits-list.component.scss']
})
export class BenefitsListComponent {
  content = AppContent;
}
