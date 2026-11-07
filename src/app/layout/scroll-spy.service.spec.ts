import { describe, it, expect } from 'vitest';
import { ScrollSpyService } from './scroll-spy.service';

describe('ScrollSpyService', () => {
  it('emits the id of the most-visible intersecting section', () => {
    const s = new ScrollSpyService();
    s.update([
      { id: 'about', isIntersecting: true, ratio: 0.2 },
      { id: 'projects', isIntersecting: true, ratio: 0.8 },
      { id: 'experience', isIntersecting: false, ratio: 0 },
    ]);
    expect(s.active).toBe('projects');
  });

  it('keeps the last active section when nothing is intersecting', () => {
    const s = new ScrollSpyService();
    s.update([{ id: 'about', isIntersecting: true, ratio: 0.5 }]);
    s.update([{ id: 'about', isIntersecting: false, ratio: 0 }]);
    expect(s.active).toBe('about');
  });
});
