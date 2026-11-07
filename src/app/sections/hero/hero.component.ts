import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HERO } from '../../data/profile';
import { EMAIL } from '../../data/social';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero">
      <p class="kicker">{{ hero.kicker }}</p>
      <h1 class="name">{{ hero.name }}</h1>
      <p class="subhead">{{ hero.subhead }}</p>
      <p class="tagline">{{ hero.tagline }}</p>
      <a class="cta" [href]="'mailto:' + email">Get In Touch</a>
    </section>
  `,
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  protected readonly hero = HERO;
  protected readonly email = EMAIL;
}
