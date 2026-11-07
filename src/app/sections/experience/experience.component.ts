import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeadingComponent } from '../../ui/section-heading.component';
import { JobItemComponent } from './job-item.component';
import { JOBS } from '../../data/experience';

@Component({
  selector: 'app-experience',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeadingComponent, JobItemComponent],
  template: `
    <app-section-heading num="03." title="My work experience" />
    <div class="timeline">
      @for (job of jobs; track job.company) {
        <app-job-item [job]="job" />
      }
    </div>
  `,
  styles: [
    `
      .timeline {
        position: relative;
        padding-left: 0.5rem;
        border-left: 1px solid rgba(100, 255, 218, 0.25);
      }
      .timeline app-job-item {
        display: block;
        padding-left: 1rem;
      }
    `,
  ],
})
export class ExperienceComponent {
  protected readonly jobs = JOBS;
}
