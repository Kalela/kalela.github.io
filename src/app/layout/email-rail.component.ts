import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EMAIL } from '../data/social';

@Component({
  selector: 'app-email-rail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside class="rail" aria-label="Email">
      <a [href]="'mailto:' + email">{{ email }}</a>
      <span class="line"></span>
    </aside>
  `,
  styles: [
    `
      .rail {
        position: fixed;
        right: var(--gutter);
        bottom: 0;
        z-index: 40;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      a {
        writing-mode: vertical-rl;
        color: var(--slate);
        letter-spacing: 0.15em;
        font-size: 0.8rem;
        font-family: var(--font-mono);
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
export class EmailRailComponent {
  protected readonly email = EMAIL;
}
