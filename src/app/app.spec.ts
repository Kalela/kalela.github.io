import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  it('creates the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the nav with a Resume/CV link', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const resume = el.querySelector('.resume');
    expect(resume?.textContent).toContain('Resume/CV');
  });

  it('renders all five section anchors', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    for (const id of [
      'about',
      'projects',
      'experience',
      'certifications',
      'contact',
    ]) {
      expect(el.querySelector(`#${id}`)).not.toBeNull();
    }
  });
});
