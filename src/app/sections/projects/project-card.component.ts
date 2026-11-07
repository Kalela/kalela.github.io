import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconComponent } from '../../ui/icon.component';
import { Project } from '../../data/models';

@Component({
  selector: 'app-project-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <article class="card">
      <a
        class="media"
        [href]="project.url"
        target="_blank"
        rel="noopener"
        [attr.aria-label]="'Open ' + project.title"
        tabindex="-1"
      >
        <img
          [src]="project.image"
          [alt]="project.title + ' preview'"
          width="600"
          height="340"
          loading="lazy"
        />
      </a>
      <div class="info">
        <p class="eyebrow">Featured Project</p>
        <h3 class="title">
          <a [href]="project.url" target="_blank" rel="noopener">
            {{ project.title }}
          </a>
          @if (project.company) {
            <span class="company">| {{ project.company }}</span>
          }
        </h3>
        <div class="desc">
          <p>{{ project.description }}</p>
        </div>
        <ul class="tech">
          @for (t of project.tech; track t) {
            <li>{{ t }}</li>
          }
        </ul>
        <div class="links">
          <a
            [href]="project.url"
            target="_blank"
            rel="noopener"
            [attr.aria-label]="project.title + ' website'"
          >
            <app-icon name="external" />
          </a>
        </div>
      </div>
    </article>
  `,
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
}
