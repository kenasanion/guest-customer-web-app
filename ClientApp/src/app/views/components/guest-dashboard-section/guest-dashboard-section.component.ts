import { Component } from '@angular/core';
import { AppContent } from 'src/app/app.resources';

@Component({
  selector: 'guest-dashboard-section',
  templateUrl: './guest-dashboard-section.component.html',
  styleUrls: ['./guest-dashboard-section.component.scss']
})
export class GuestDashboardSectionComponent {
  content = AppContent;
}
