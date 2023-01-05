import { Component } from '@angular/core';
import { AppContent } from 'src/app/app.resources';

@Component({
  selector: 'guest-phone-section',
  templateUrl: './guest-phone-section.component.html',
  styleUrls: ['./guest-phone-section.component.scss']
})
export class GuestPhoneSectionComponent {
  content = AppContent;
}
