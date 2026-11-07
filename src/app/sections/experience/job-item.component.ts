import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconComponent } from '../../ui/icon.component';
import { Job } from '../../data/models';

@Component({
  selector: 'app-job-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <article class="job">
      <div class="badge">
        @if (job.icon.type === 'image') {
          <img [src]="job.icon.src" [alt]="job.icon.alt" width="44" height="44" loading="lazy" />
        } @else {
          <span class="fa" [style.background]="job.icon.bg || 'var(--panel)'">
            <app-icon [name]="job.icon.name" />
          </span>
        }
      </div>
      <div class="body">
        <h3 class="role">
          {{ job.title }}
          <a [href]="job.url" target="_blank" rel="noopener" class="company">
            | {{ job.company }}
          </a>
        </h3>
        <p class="duration">{{ job.duration }}</p>
        <p class="desc">{{ job.description }}</p>
      </div>
    </article>
  `,
  styleUrl: './job-item.component.scss',
})
export class JobItemComponent {
  @Input({ required: true }) job!: Job;
}
