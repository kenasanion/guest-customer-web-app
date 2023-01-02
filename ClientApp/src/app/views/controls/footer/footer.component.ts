import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'gapp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() scrollTarget: Element = {} as Element;

  ngOnInit(): void {
  }

  scrollToTop(){
    this.scrollTarget.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
