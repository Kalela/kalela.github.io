import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../ui/icon.component';
import { SOCIALS } from '../data/social';

@Component({
  selector: 'app-side-rail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <aside class="rail" aria-label="Social links">
      <ul>
        @for (s of socials; track s.href) {
          <li>
            <a
              [href]="s.href"
              [attr.aria-label]="s.ariaLabel"
              [attr.target]="s.href.startsWith('http') ? '_blank' : null"
              [attr.rel]="s.href.startsWith('http') ? 'noopener' : null"
            >
              <app-icon [name]="s.icon" />
            </a>
          </li>
        }
      </ul>
      <span class="line"></span>
    </aside>
  `,
  styles: [
    `
      .rail {
        position: fixed;
        left: var(--gutter);
        bottom: 0;
        z-index: 40;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }
      a {
        color: var(--slate);
        font-size: 1.1rem;
        display: inline-flex;
        transition:
          color 0.2s,
          transform 0.2s;
      }
      a:hover {
        color: var(--teal);
        transform: translateY(-3px);
      }
      .line {
        width: 1px;
        height: 90px;
        margin-top: 1.25rem;
        background: var(--slate);
        opacity: 0.4;
      }
      @media (max-width: 1000px) {
        .rail {
          display: none;
        }
      }
    `,
  ],
})
export class SideRailComponent {
  protected readonly socials = SOCIALS;
}
