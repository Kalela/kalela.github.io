import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeadingComponent } from '../../ui/section-heading.component';
import { CertCardComponent } from './cert-card.component';
import { CERTIFICATIONS } from '../../data/certifications';

@Component({
  selector: 'app-certifications',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeadingComponent, CertCardComponent],
  template: `
    <app-section-heading num="04." title="Certifications" />
    <div class="grid">
      @for (c of certifications; track c.name) {
        <app-cert-card [cert]="c" />
      }
    </div>
  `,
  styles: [
    `
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.25rem;
      }
    `,
  ],
})
export class CertificationsComponent {
  protected readonly certifications = CERTIFICATIONS;
}
