import { AfterViewInit, Component, inject } from '@angular/core';
import { TopNavComponent } from './layout/top-nav.component';
import { SideRailComponent } from './layout/side-rail.component';
import { EmailRailComponent } from './layout/email-rail.component';
import { ScrollSpyService } from './layout/scroll-spy.service';
import { HeroComponent } from './sections/hero/hero.component';
import { AboutComponent } from './sections/about/about.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { CertificationsComponent } from './sections/certifications/certifications.component';

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
  imports: [
    TopNavComponent,
    SideRailComponent,
    EmailRailComponent,
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    ExperienceComponent,
    CertificationsComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  private readonly scrollSpy = inject(ScrollSpyService);

  ngAfterViewInit(): void {
    this.scrollSpy.observe(SECTION_IDS);
  }
}
