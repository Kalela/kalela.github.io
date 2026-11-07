import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EMAIL } from '../../data/social';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="contact">
      <p class="kicker">05. What's Next?</p>
      <h2 class="title">Get In Touch</h2>
      <p class="blurb">
        Whether you have a question or just want to say hi, I'll try my best to
        get back to you!
      </p>
      <a class="cta" [href]="'mailto:' + email">Say Hello</a>
    </div>

    <footer class="footer">
      Designed by
      <a href="https://champ96k.github.io/#/" target="_blank" rel="noopener">
        Tushar Nikam </a
      >, modified for self by Philip Kalela 💙 Angular
    </footer>
  `,
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  protected readonly email = EMAIL;
}
