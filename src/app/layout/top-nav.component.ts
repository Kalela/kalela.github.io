import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { IconComponent } from '../ui/icon.component';
import { ScrollSpyService } from './scroll-spy.service';
import { RESUME_URL } from '../data/social';

interface NavItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-top-nav',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, IconComponent],
  template: `
    <header class="nav">
      <a class="caret" href="#top" aria-label="Back to top">
        <app-icon name="caret-up" />
      </a>
      <nav class="tabs" aria-label="Section navigation">
        @for (item of items; track item.id) {
          <a
            class="tab"
            [href]="'#' + item.id"
            [class.active]="(active$ | async) === item.id"
          >
            {{ item.label }}
          </a>
        }
      </nav>
      <a class="resume" [href]="resumeUrl" target="_blank" rel="noopener">
        Resume/CV
      </a>
    </header>
  `,
  styleUrl: './top-nav.component.scss',
})
export class TopNavComponent {
  protected readonly items: NavItem[] = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Clients/Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact Us' },
  ];
  protected readonly resumeUrl = RESUME_URL;
  protected readonly active$ = inject(ScrollSpyService).activeSection$;
}
