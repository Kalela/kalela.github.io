import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeadingComponent } from '../../ui/section-heading.component';
import { ProjectCardComponent } from './project-card.component';
import { PROJECTS } from '../../data/projects';

@Component({
  selector: 'app-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeadingComponent, ProjectCardComponent],
  template: `
    <app-section-heading num="02." title="Some of my featured projects" />
    <div class="list">
      @for (p of projects; track p.title) {
        <app-project-card [project]="p" />
      }
    </div>
  `,
  styles: [
    `
      .list {
        display: flex;
        flex-direction: column;
        gap: clamp(3.5rem, 9vh, 7rem);
      }
    `,
  ],
})
export class ProjectsComponent {
  protected readonly projects = PROJECTS;
}
