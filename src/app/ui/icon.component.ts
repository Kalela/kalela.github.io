import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faGithub,
  faLinkedin,
  faUpwork,
} from '@fortawesome/free-brands-svg-icons';
import {
  faArrowUpRightFromSquare,
  faBriefcase,
  faEnvelope,
  faHouseLaptop,
  faPhone,
  faSquareCaretUp,
} from '@fortawesome/free-solid-svg-icons';

const ICONS: Record<string, IconDefinition> = {
  github: faGithub,
  linkedin: faLinkedin,
  upwork: faUpwork,
  phone: faPhone,
  envelope: faEnvelope,
  'caret-up': faSquareCaretUp,
  external: faArrowUpRightFromSquare,
  briefcase: faBriefcase,
  'house-laptop': faHouseLaptop,
};

/** Renders a Font Awesome icon as inline SVG (prerender-safe, no icon font). */
@Component({
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.viewBox]="viewBox"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      class="app-icon"
    >
      <path [attr.d]="path" />
    </svg>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        line-height: 0;
      }
    `,
  ],
})
export class IconComponent {
  @Input({ required: true })
  set name(value: string) {
    const def = ICONS[value];
    if (!def) {
      throw new Error(`Unknown icon: ${value}`);
    }
    const [w, h, , , d] = def.icon;
    this.viewBox = `0 0 ${w} ${h}`;
    this.path = Array.isArray(d) ? d.join(' ') : d;
  }

  protected viewBox = '0 0 512 512';
  protected path = '';
}
