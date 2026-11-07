import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconComponent } from '../../ui/icon.component';
import { Certification } from '../../data/models';

@Component({
  selector: 'app-cert-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <article class="cert">
      <img
        class="badge"
        [src]="cert.image"
        [alt]="cert.name + ' badge'"
        width="120"
        height="120"
        loading="lazy"
      />
      <div class="meta">
        <h3 class="name">{{ cert.name }}</h3>
        <p class="issuer">{{ cert.issuer }} · {{ cert.date }}</p>
        <a
          class="verify"
          [href]="cert.credlyUrl"
          target="_blank"
          rel="noopener"
          [attr.aria-label]="'Verify ' + cert.name + ' on Credly'"
        >
          Verify on Credly <app-icon name="external" />
        </a>
      </div>
    </article>
  `,
  styleUrl: './cert-card.component.scss',
})
export class CertCardComponent {
  @Input({ required: true }) cert!: Certification;
}
