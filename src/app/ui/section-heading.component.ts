import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/** The numbered "01. Section Title ──────" heading used across sections. */
@Component({
  selector: 'app-section-heading',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 class="heading">
      <span class="num">{{ num }}</span>
      <span class="title">{{ title }}</span>
      <span class="rule"></span>
    </h2>
  `,
  styles: [
    `
      .heading {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        margin: 0 0 2.5rem;
        font-size: clamp(1.4rem, 4vw, 1.8rem);
      }
      .num {
        color: var(--teal);
        font-family: var(--font-mono);
        font-size: 0.85em;
        font-weight: 500;
      }
      .title {
        color: var(--slate-light);
        font-weight: 700;
        white-space: nowrap;
      }
      .rule {
        flex: 1;
        height: 1px;
        background: #303c55;
        margin-left: 0.5rem;
      }
    `,
  ],
})
export class SectionHeadingComponent {
  @Input({ required: true }) num = '';
  @Input({ required: true }) title = '';
}
