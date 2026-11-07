import { AfterViewInit, Component, inject } from '@angular/core';
import { TopNavComponent } from './layout/top-nav.component';
import { SideRailComponent } from './layout/side-rail.component';
import { EmailRailComponent } from './layout/email-rail.component';
import { ScrollSpyService } from './layout/scroll-spy.service';

const SECTION_IDS = [
  'about',
  'projects',
  'experience',
  'certifications',
  'contact',
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopNavComponent, SideRailComponent, EmailRailComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  private readonly scrollSpy = inject(ScrollSpyService);

  ngAfterViewInit(): void {
    this.scrollSpy.observe(SECTION_IDS);
  }
}
