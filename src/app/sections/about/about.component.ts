import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeadingComponent } from '../../ui/section-heading.component';
import { IconComponent } from '../../ui/icon.component';
import {
  ABOUT_PARAGRAPHS,
  ABOUT_TECH,
  LINKEDIN_URL,
  PROFILE_IMAGE,
} from '../../data/profile';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeadingComponent, IconComponent],
  template: `
    <app-section-heading num="01." title="About Me" />
    <div class="grid">
      <div class="bio">
        @for (p of paragraphs; track $index) {
          <p>{{ p }}</p>
        }
        <ul class="tech">
          @for (t of tech; track t) {
            <li><app-icon name="briefcase" /> {{ t }}</li>
          }
        </ul>
      </div>
      <a class="portrait" [href]="linkedin" target="_blank" rel="noopener"
        aria-label="Philip Kalela on LinkedIn">
        <img [src]="image" alt="Philip Kalela" width="320" height="320" loading="lazy" />
      </a>
    </div>
  `,
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  protected readonly paragraphs = ABOUT_PARAGRAPHS;
  protected readonly tech = ABOUT_TECH;
  protected readonly image = PROFILE_IMAGE;
  protected readonly linkedin = LINKEDIN_URL;
}
